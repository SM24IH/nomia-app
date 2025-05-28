git init
git add .
git commit -m "Deploy build for GitHub Pages"
git branch -M main
git remote add origin https://github.com/SM24IH/nomia-pages.git
git push -u origin main
