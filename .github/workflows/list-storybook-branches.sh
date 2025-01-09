#!/bin/bash

# Number of days to check
DAYS=10

# Get the current date in seconds since epoch
CURRENT_DATE=$(date +%s)

# Array to hold branch names
recent_branches=()

# Fetch remote branches (if you want remote branches as well)
git fetch --all --prune > /dev/null 2>&1

# Loop through all branches
for branch in $(git branch -r | sed 's/origin\///g'); do
    # Get the latest commit date for the branch in seconds since epoch
    commit_date=$(git log -1 --format=%ct "$branch")

    # Calculate the difference in days
    diff_days=$(( (CURRENT_DATE - commit_date) / 86400 ))
    #echo "$branch - $diff_days"
    # Check if the difference is less than or equal to the threshold
    if [ "$diff_days" -le "$DAYS" ] || [ "$branch" == "rc" ] || [ "$branch" == "main" ]; then
        recent_branches+=("$branch")
    fi
done

printf '%s\n' "${recent_branches[@]}" | jq -R . | jq -s -c .
