#!/bin/bash

# Switch to the repository root directory
cd "$(git rev-parse --show-toplevel)"

echo "Pre-push hook started."

# Set the Python script's path
SCRIPT_PATH="main.py"

echo "Activating virtual environment..."

# Check if the virtual environment exists
if [ ! -d "backend/env" ]; then
    echo "Error: Virtual environment not found in backend/env. Push aborted."
    exit 1
fi

cd backend
source env/bin/activate
# Execute the Python script
python3 "$SCRIPT_PATH"

# Check if the script executed successfully
if [ $? -ne 0 ]; then
    echo "Error: Python script execution failed. Push aborted."
    exit 1
fi

echo "Python script executed successfully. Proceeding with push."
