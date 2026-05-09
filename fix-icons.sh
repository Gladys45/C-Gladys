#!/bin/bash

echo "Fixing JSX icon assignments..."

# Fix all icon: <Something /> patterns
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d '' file; do
  sed -i -E 's/icon: <([A-Za-z0-9_]+).*\/>/icon: \1/g' "$file"
done

echo "Done. All JSX icons converted to component references."
