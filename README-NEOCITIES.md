# 🚀 NatalEngine для Neocities

Это руководство по сборке и деплою NatalEngine на статический хостинг Neocities.

## 📋 Требования

- Node.js >= 20.0.0
- GitHub аккаунт (для CodeSpaces)
- Neocities аккаунт

## 🛠️ Сборка в CodeSpaces

### 1. Откройте репозиторий в CodeSpaces
- Перейдите на GitHub → ваш форк natalengine
- Нажмите зелёную кнопку **Code** → **Codespaces** → **Create codespace on main**

### 2. Дождитесь установки зависимостей
CodeSpaces автоматически выполнит `npm ci` благодаря `.devcontainer/devcontainer.json`

### 3. Соберите проект для Neocities
```bash
npm run build:neocities
