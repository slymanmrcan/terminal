# Terminal CV

Interaktif, terminal gorunumlu ve iki dilli (TR/EN) CV sitesi.

## Neler Var?
- Terminal UX: komut tabanli gezinti
- Dil destegi: `lang tr`, `lang en`
- Tema: `theme` (dark/light toggle)
- PDF CV: `cv --pdf`, `cv --download`
- Icerik arama: `search <keyword>`
- Kopyalama: `copy email`, `copy phone`
- Autocomplete: `Tab` ve `Shift+Tab`
- Yazim hatasi onerisi: yanlis komutta `Did you mean ...`
- Ilk acilista hizli tur: `guide`

## Fun Komutlar
- `fortune`
- `coffee`
- `roll`
- `matrix`
- `ascii [terminal|cat|rocket|skull|list]`
- `cowsay [mesaj]`
- `joke`
- `hack [hedef]`
- `sudo hire-me`

## Calistirma
Bu proje saf HTML/CSS/JS oldugu icin build adimi yok.

### 1) Direkt ac
`index.html` dosyasini tarayicida ac.

### 2) Lokal sunucu ile ac (onerilen)
```bash
npx serve .
```
Sonra terminalde verilen adrese git.

## Mimari
- `terminal.js`: input/output, history, autocomplete, boot
- `js/commands/index.js`: komut kaydi + typo suggestion + completion API
- `js/commands/*`: komut gruplari (`meta`, `profile`, `navigation`, `system`, `fun`)
- `js/data.js`: CV icerikleri
- `js/i18n.js`: TR/EN metinleri
- `js/theme.js`: tema state

## CV'de Nasıl Konumlanır?
Evet, CV'ye eklenebilir.
Ama "ana teknik proje" yerine su sekilde konumlandirmak daha dogru:

- **Personal branding / developer experience project**
- **Frontend UX + modular JS architecture + i18n + command parser**
- Demo linki ile birlikte kisa madde

Ornek madde:
> Built an interactive terminal-style bilingual CV with modular command architecture, autocomplete, typo suggestions, and downloadable PDF flow.

## Lisans
MIT (bkz. `LICENSE`)
