#!/bin/bash

# Number of days to check
DAYS=10

# Get the current date in seconds since epoch
CURRENT_DATE=$(date +%s)

# Array to hold branch names
recent_branches=("main" "rc")
excluded=("HEAD" "->" "main" "rc")
# Fetch remote branches (if you want remote branches as well)
git fetch --all --prune > /dev/null 2>&1

# Loop through all branches
for branch in $(git branch -r | sed 's/origin\///g'); do

    # filtering out values that are undesired
    # shellcheck disable=SC2199
    if [[ ${excluded[@]} =~ $branch ]]
    then
      continue
    fi
    # Get the latest commit date for the branch in seconds since epoch
    commit_date=$(git log -1 --format=%ct "origin/$branch")
    # Calculate the difference in days
    diff_days=$(( (CURRENT_DATE - commit_date) / 86400 ))
    #echo "$branch - $commit_date - $diff_days " #Debugging
    # Check if the difference is less than or equal to the threshold
    if [ "$diff_days" -le "$DAYS" ] ; then
        recent_branches+=("$branch")
    fi
done

printf '%s\n' "${recent_branches[@]}" | jq -R . | jq -s -c .
