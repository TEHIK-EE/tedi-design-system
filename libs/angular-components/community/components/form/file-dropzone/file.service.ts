import { inject, Injectable, Signal, signal } from "@angular/core";
import {
  DropzoneValidatorFunction,
  FileDropzone,
  FileInputMode,
  ValidationState,
} from "./types";
import { TediTranslationService } from "tedi/services";

@Injectable({
  providedIn: "root",
})
export class FileService {
  maxSize = 0;
  accept = "";
  mode: FileInputMode = "append";
  uploadState = signal<ValidationState>("none");
  validators: DropzoneValidatorFunction[] = [];

  protected _files = signal<FileDropzone[]>([]);

  private _translateService = inject(TediTranslationService);

  get files(): Signal<FileDropzone[]> {
    return this._files;
  }
  public async addFiles(files: FileDropzone[] | File[]): Promise<string[]> {
    let newFiles = this.normalizeFiles(files);
    const currentFiles = this.files();

    switch (this.mode) {
      case "append": {
        // index any duplicate name file
        newFiles = await this._renameDuplicates(currentFiles, newFiles);
        break;
      }

      case "replace": {
        // replace any files with the same name
        const filesToCheck = [...currentFiles, ...newFiles];
        const duplicateFiles = filesToCheck.filter(
          (file, index, self) =>
            self.findIndex((f) => f.name === file.name) !== index
        );
        if (duplicateFiles.length > 0) {
          newFiles = newFiles.filter(
            (file) => !duplicateFiles.some((f) => f.name === file.name)
          );
        }
        break;
      }
    }
    newFiles.push(...currentFiles);

    // remove old invalid files, fileStatus will not yet be set for new files
    if (this.uploadState() === "invalid") {
      newFiles = newFiles.filter((file) => file.fileStatus !== "invalid");
    }
    const error = this._checkErrorState(newFiles);
    this.uploadState.set(this._getNewState(!!error.length));
    this._files.set(newFiles);
    return error;
  }

  public reValidateFiles() {
    const files = this.files();
    const error = this._checkErrorState(files);
    this.uploadState.set(this._getNewState(!!error.length));
  }

  public normalizeFiles(files: FileDropzone[] | File[]): FileDropzone[] {
    if (!files || files.length === 0) {
      return [];
    }
    const newFiles = files.map((file) => {
      if (file instanceof FileDropzone) {
        return file;
      }
      if (file instanceof File) {
        return new FileDropzone(file as File);
      }
      throw new Error("Invalid file type provided to addFiles");
    });
    return newFiles;
  }

  public removeFiles(files: FileDropzone[]): string[] {
    if (!files || files.length === 0) {
      return [];
    }
    const newFiles = this.files().filter((file) => !files.includes(file));
    this._files.set(newFiles);
    const errors = this._checkErrorState(newFiles);
    if (errors.length) {
      this.uploadState.set("invalid");
    } else {
      this.uploadState.set(this._files.length > 0 ? "valid" : "none");
    }

    return errors;
  }

  private _getNewState(error: boolean): ValidationState {
    if (error) {
      return "invalid";
    }
    return this._files().length > 0 ? "valid" : "none";
  }

  private _checkErrorState(files: FileDropzone[]): string[] {
    const errors: string[] = [];
    for (const file of files) {
      file.helper = undefined;
      const error = this.validators
        .map((validator) =>
          validator(
            this.maxSize,
            this.accept,
            file,
            this._translateService.translate.bind(this._translateService)
          )
        )
        .filter((err) => err !== undefined);

      if (error.length) {
        errors.push(...error);
        file.helper = {
          type: "error",
          text: error.join(", "),
        };
      }
      file.fileStatus = error.length ? "invalid" : "valid";
    }
    return errors;
  }

  private async _renameDuplicates(
    currentFiles: FileDropzone[],
    newFiles: FileDropzone[]
  ): Promise<FileDropzone[]> {
    const renamedFiles: FileDropzone[] = [];
    const fileNames = new Set(
      currentFiles.map((file) => file.name.toLowerCase())
    );

    for (const file of newFiles) {
      const maxCounter = 1000;
      let newName = file.name;
      let counter = 1;

      while (fileNames.has(newName.toLowerCase()) && counter < maxCounter) {
        // the .extension part of the file name unfortunately
        const [fileName, ...rest] = file.name.split(".");
        newName = `${fileName} (${counter}).${rest.join(".")}`;
        counter++;
      }

      fileNames.add(newName.toLowerCase());
      renamedFiles.push(await this._copyFile(file.file, newName));
    }
    return renamedFiles;
  }

  private _copyFile(original: File, newName?: string): Promise<FileDropzone> {
    return original.arrayBuffer().then((buffer) => {
      const file = new File([buffer], newName ?? original.name, {
        type: original.type,
        lastModified: original.lastModified,
      });
      return new FileDropzone(file);
    });
  }
}
