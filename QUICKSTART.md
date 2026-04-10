# 🚀 QUICK START - Battlefield Strategy AI

## ⚡ Get Running in 60 Seconds

### 1. Extract the ZIP
```bash
unzip battlefield-ai-final.zip
cd battlefield-ai
```

### 2. Install Dependencies
```bash
npm install
```
This takes ~30 seconds. Installs React, TypeScript, Tailwind, etc.

### 3. Start the Game
```bash
npm run dev
```

### 4. Open Browser
```
http://localhost:5173
```

**That's it! Game is running.** 🎮

---

## 🎮 How to Play

### **Choose Your Mode**

**Human vs AI:**
- You control the Enemy unit (red)
- AI controls its own unit (blue)
- Wait for AI to make its move
- Then you choose: Attack / Defend / Retreat

**AI vs AI:**
- Sit back and watch
- Both units controlled by AI
- Perfect for algorithm demonstration

---

### **Controls**

**Before Game Starts:**
- Pick AI unit type (Infantry/Armor/Artillery)
- Pick Enemy unit type
- Set search depth (1-6)
- Toggle Alpha-Beta pruning on/off

**During Human Mode:**
- Wait for AI turn (blue unit)
- When it's your turn, click action button:
  - ⚔️ **Attack** - Damage enemy
  - 🛡️ **Defend** - Restore stamina, counter
  - 🏃 **Retreat** - Move away, heal

---

## 📊 Understanding the UI

### **Left Panel:**
- **Game Mode** - Human vs AI / AI vs AI
- **Unit Selection** - Choose unit types
- **Search Depth** - How far AI looks ahead (1-6)
- **Alpha-Beta** - Pruning on/off
- **Performance Stats** - Node counts, efficiency

### **Center:**
- **Status Bars** - HP and Stamina for both units
- **Battlefield Grid** - 10×10 with terrain
  - Green = Plains
  - Dark green = Forest
  - Brown = Hills  
  - Blue = Water
- **Units:**
  - Blue circle = AI unit
  - Red circle = Enemy unit

### **Right Panel:**
- **AI Decision** - What AI chose and why
  - Action taken
  - Score evaluation
  - Nodes searched
  - Time taken
- **Action Buttons** - Your controls (Human mode)
- **Battle Log** - Turn-by-turn history

---

## 🎯 Tips for Best Experience

### **Learning the Algorithm:**
1. Set depth to 2
2. Turn OFF Alpha-Beta
3. Watch node count
4. Turn ON Alpha-Beta
5. See ~70% fewer nodes!

### **Watching Unit Types:**
1. Try Infantry vs Artillery
2. Artillery has range 4, Infantry range 1
3. See how AI manages distance

### **Terrain Effects:**
1. Watch units on different terrain
2. Hills give artillery bonus
3. Forest helps infantry

---

## 🏗️ Building for Production

```bash
npm run build
```

Output goes to `dist/` folder.

**Deploy to:**
- Vercel: `vercel`
- Netlify: Drag `dist` folder to netlify.app
- GitHub Pages: See `DEPLOYMENT.md`

---

## 📁 Project Files

**Important files:**
- `src/core/minimax.ts` - The AI algorithm
- `src/core/heuristic.ts` - How AI evaluates positions
- `src/hooks/useGameEngine.ts` - Game state manager
- `src/App.tsx` - Main UI

**Documentation:**
- `README.md` - Full documentation
- `PROJECT_STRUCTURE.md` - Code organization
- `DEPLOYMENT.md` - How to deploy
- `FOLDER_GUIDE.md` - Visual structure

---

## 🐛 Troubleshooting

**"npm install" fails:**
```bash
# Make sure you have Node.js 18+
node --version

# If too old, install from nodejs.org
```

**Port 5173 already in use:**
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

**Build fails:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🎓 Understanding the Code

**Want to learn how it works?**

1. Start with `src/core/minimax.ts`
   - See the algorithm implementation
   - Understand alpha-beta pruning

2. Check `src/core/heuristic.ts`
   - See 7 evaluation factors
   - Understand position scoring

3. Look at `src/hooks/useGameEngine.ts`
   - See how React manages game state
   - Understand turn processing

4. Read inline comments
   - Every file has explanations
   - Understanding the architecture

---

## 📚 Next Steps

**Customize It:**
- Change unit stats in `src/core/constants.ts`
- Modify colors in `tailwind.config.js`
- Adjust heuristic weights in `src/core/heuristic.ts`

**Extend It:**
- Add more unit types
- Create new terrain types
- Implement fog of war
- Add multiplayer

**Learn More:**
- Read about Minimax on Wikipedia
- Study Alpha-Beta pruning
- Explore game AI techniques

---

## ✅ Checklist

- [ ] Extracted ZIP
- [ ] Ran `npm install`
- [ ] Started dev server (`npm run dev`)
- [ ] Opened http://localhost:5173
- [ ] Tried both game modes
- [ ] Tested depth slider
- [ ] Toggled Alpha-Beta pruning
- [ ] Watched performance stats
- [ ] Read the battle log

**All checked? You're ready to demo! 🎉**

---

## 🆘 Need Help?

1. Check `README.md` for full documentation
2. Review `PROJECT_STRUCTURE.md` for code layout
3. Read inline code comments
4. See `DEPLOYMENT.md` for hosting

---

**Enjoy exploring tactical AI! ⚔️**

Built with React + TypeScript + Tailwind  
Pure Minimax implementation, no external AI libraries  
Educational project for learning game AI algorithms
