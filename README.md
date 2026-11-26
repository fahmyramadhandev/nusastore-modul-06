# Modul 06 — Git & GitHub | Repository latihan NusaStore

Folder ini disiapkan sebagai proyek yang akan dikelola dengan Git. Jalankan perintah dari direktori ini.

## 6.1 Git Intro, Install, & Configuration
```bash
git --version
git config --global user.name "NAMA ANDA"
git config --global user.email "EMAIL_GITHUB_ANDA"
git config --list
```

## 6.2 Git Workflow: Staging & Commit
```bash
git init
git status
git add .
git status
git commit -m "feat: initial NusaStore project"
git log --oneline
```

## 6.3 Git Branching & Merging
```bash
git switch -c feature/deskripsi-produk
# Lakukan perubahan nyata pada README.md, simpan, lalu:
git add README.md
git commit -m "docs: add product description"
git switch main
git merge feature/deskripsi-produk
git branch
git log --oneline --graph --all
```
Jika branch awal bernama `master`, gunakan `master` menggantikan `main`.

## 6.4 GitHub Remote, Clone, Push & Pull
Buat repository kosong bernama `nusastore-modul06` di akun GitHub. Ganti USERNAME dengan akun sendiri.
```bash
git branch -M main
git remote add origin https://github.com/USERNAME/nusastore-modul06.git
git remote -v
git push -u origin main
git pull origin main
```
Untuk clone repository pada direktori lain:
```bash
git clone https://github.com/USERNAME/nusastore-modul06.git
```

## 6.5 Advanced Git: Revert, Reset, & Conflict Resolution
Lihat hash commit:
```bash
git log --oneline
```
Batalkan commit dengan membuat commit baru (ganti HASH):
```bash
git revert HASH
```
Latihan reset aman (perubahan tetap tersimpan di staging):
```bash
git reset --soft HEAD~1
```
Jangan gunakan `git reset --hard` jika belum memahami risikonya karena dapat membuang perubahan lokal.

Latihan konflik:
1. Pastikan semua perubahan sudah di-commit.
2. Buat dua branch dari commit dasar: `git switch -c latihan-a`.
3. Ubah satu kalimat yang sama pada README.md, lalu commit.
4. Kembali ke branch dasar (`main`), buat branch `latihan-b`.
5. Ubah baris yang sama dengan isi berbeda, lalu commit.
6. Gabungkan `latihan-a` ke `latihan-b` dengan `git merge latihan-a`.
7. Saat konflik muncul, buka README.md, pilih isi final, hapus penanda `<<<<<<<`, `=======`, `>>>>>>>`.
8. Jalankan `git add README.md` dan `git commit -m "fix: resolve merge conflict"`.

## Catatan keamanan
Jangan menaruh password, token, atau private SSH key di repository atau laporan. Gunakan public key saja ketika mengatur SSH.
- Fitur informasi tentang NusaStore.
- Fitur informasi tentang NusaStore.
