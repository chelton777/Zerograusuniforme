# 🎨 GUIA DE PREPARAÇÃO DO LOGO - ZERO GRAUS

## ✅ ESPECIFICAÇÕES DO LOGO:

### **Logo Principal (logo.png)**
- **Formato:** PNG com fundo transparente
- **Tamanho:** 400x400px (ou proporcional)
- **Peso:** < 50KB
- **Uso:** Header do site (todas as páginas)

### **Características:**
- ✅ Fundo 100% transparente
- ✅ Alta qualidade (300 DPI se possível)
- ✅ Cores vibrantes e nítidas
- ✅ Bordas limpas (sem serrilhado)

---

## 🔧 COMO PREPARAR O LOGO:

### **Opção 1: Se você tem o logo em vetor (AI, SVG, PDF):**

1. **Abrir no Illustrator/Inkscape**
2. **Exportar como PNG:**
   - Largura: 400px (altura automática)
   - Fundo: Transparente
   - Resolução: 300 DPI
3. **Salvar como:** `logo.png`

### **Opção 2: Se você tem logo em JPG/JPEG:**

**Remover fundo online (GRÁTIS):**

1. **Remove.bg** - https://www.remove.bg/
   - Upload da imagem
   - Download automático com fundo transparente
   - Salvar como `logo.png`

2. **Photopea** - https://www.photopea.com/
   - Abrir imagem
   - Usar ferramenta "Magic Wand" para selecionar fundo
   - Delete
   - File > Export As > PNG
   - Salvar como `logo.png`

3. **Canva** - https://www.canva.com/
   - Upload da imagem
   - Background Remover (grátis)
   - Download como PNG
   - Salvar como `logo.png`

### **Opção 3: Photoshop:**

1. Abrir imagem
2. Selecionar fundo com "Magic Wand Tool" (W)
3. Delete
4. File > Export > Export As
5. Formato: PNG
6. Transparency: ✓ Checked
7. Salvar como `logo.png`

---

## 📐 TAMANHOS NECESSÁRIOS:

### **1. Logo Principal**
```
Nome: logo.png
Tamanho: 400x400px (ou proporcional)
Uso: Header do site
```

### **2. Logo Branco (para fundos escuros)**
```
Nome: logo-white.png
Tamanho: 400x400px
Uso: Footer, emails
```

### **3. Favicon**
```
Nome: favicon.png
Tamanho: 512x512px (quadrado)
Uso: Ícone da aba do navegador
```

### **4. Apple Touch Icon**
```
Nome: apple-touch-icon.png
Tamanho: 180x180px
Uso: Ícone no iPhone/iPad
```

### **5. OG Image (Redes Sociais)**
```
Nome: og-image.jpg
Tamanho: 1200x630px (EXATO)
Uso: WhatsApp, Facebook, Twitter
Pode ter fundo colorido
```

---

## 🎯 PRIORIDADES:

### **URGENTE:**
- [x] `logo.png` - Logo principal (FEITO - só precisa ter fundo transparente)

### **IMPORTANTE:**
- [ ] `favicon.png` - Ícone da aba
- [ ] `og-image.jpg` - Compartilhamento em redes sociais

### **DESEJÁVEL:**
- [ ] `logo-white.png` - Versão branca
- [ ] `apple-touch-icon.png` - Ícone Apple

---

## 🔍 VERIFICAR SE O LOGO ESTÁ CORRETO:

### **Checklist:**
- [ ] Arquivo é PNG (não JPG)
- [ ] Fundo é transparente (não branco)
- [ ] Tamanho adequado (mínimo 200px de largura)
- [ ] Peso < 50KB
- [ ] Cores nítidas e vibrantes
- [ ] Sem bordas brancas/cinzas

### **Teste Rápido:**
1. Abrir `logo.png` no visualizador de imagens
2. Fundo deve aparecer como quadriculado (transparente)
3. Não deve ter borda branca ao redor

---

## 💡 DICAS:

### **Se o logo tiver texto pequeno:**
- Aumentar tamanho para 600px de largura
- Garantir legibilidade

### **Se o logo for muito colorido:**
- Manter cores vibrantes
- Evitar gradientes complexos (aumenta tamanho do arquivo)

### **Se o logo for muito grande (>100KB):**
- Comprimir usando TinyPNG: https://tinypng.com/
- Reduzir tamanho para 300-400px

---

## 📱 COMO CRIAR FAVICON:

### **Método 1: Online (Mais fácil)**
1. Ir para: https://realfavicongenerator.net/
2. Upload do `logo.png`
3. Ajustar configurações
4. Download do pacote completo
5. Copiar `favicon.png` para `/images/logos/`

### **Método 2: Manual**
1. Abrir `logo.png` no Photoshop/GIMP
2. Redimensionar para 512x512px (quadrado)
3. Centralizar logo
4. Exportar como PNG
5. Salvar como `favicon.png`

---

## 🎨 COMO CRIAR OG IMAGE:

**OG Image é a imagem que aparece quando você compartilha o site no WhatsApp/Facebook**

### **Especificações:**
- Tamanho: 1200x630px (EXATO)
- Formato: JPG ou PNG
- Peso: < 300KB

### **Conteúdo sugerido:**
```
┌─────────────────────────────────┐
│                                 │
│      [LOGO ZERO GRAUS]          │
│                                 │
│   Uniformes Escolares           │
│   Moçambique                    │
│                                 │
│   📱 +258 84 830 4000           │
│   🌐 zerograus.co.mz            │
│                                 │
└─────────────────────────────────┘
```

### **Ferramentas:**
- **Canva** - https://www.canva.com/ (templates prontos)
- **Photoshop** - Design personalizado
- **Figma** - Design colaborativo

---

## ✅ QUANDO CONCLUIR:

### **Arquivos na pasta `/images/logos/`:**
```
✅ logo.png (principal)
⏳ favicon.png
⏳ og-image.jpg
⏳ logo-white.png (opcional)
⏳ apple-touch-icon.png (opcional)
```

### **Atualizar HTML:**
```html
<!-- Já feito -->
<img src="./images/logos/logo.png" alt="ZERO GRAUS">

<!-- Adicionar no <head> -->
<link rel="icon" href="./images/logos/favicon.png">
<link rel="apple-touch-icon" href="./images/logos/apple-touch-icon.png">
<meta property="og:image" content="https://zerograus.co.mz/images/logos/og-image.jpg">
```

---

## 🆘 PROBLEMAS COMUNS:

### **"Logo aparece com fundo branco"**
→ Arquivo é JPG, não PNG. Converter para PNG com transparência.

### **"Logo aparece muito pequeno"**
→ Aumentar tamanho do arquivo PNG (mínimo 300px largura).

### **"Logo aparece pixelado"**
→ Usar imagem de maior resolução (300 DPI).

### **"Logo não carrega"**
→ Verificar caminho: `./images/logos/logo.png`
→ Verificar nome do arquivo (case-sensitive).

---

**Última atualização:** 25/10/2025 19:13
