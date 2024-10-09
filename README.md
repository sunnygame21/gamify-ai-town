# Gamify AI Town
A simple ai town to demo how easy to integrate adventure game with RPGGO API V2

![1280X1280](https://github.com/user-attachments/assets/eec02e09-d24b-4e5b-93ff-e9e3d146358f)



## 📖 Brief
If you're dreaming of making your own AI-powered town-building game, well, you'll need more than just game dev skills. You'll also have to tackle some seriously brainy AI challenges, like auto-generating storylines, managing memory stacks, handling NPC interactions, and dealing with memory systems—basically, all the techy stuff that turns solo game development into a next-level boss fight!

But now, there's a smarter solution! With the RPGGO API, you can free yourself from the tangled web of AI logic and focus on crafting the game itself. RPGGO will infuse your game with an AI-powered soul, taking care of all the complex AI magic for you!

This demo project tries to show you how the system will work.

<br>

## Online demo

[Click and Play](https://gitclone.com/ai-town/)

<br>

## ❓ How it works

![whiteboard_exported_image (9)](https://github.com/user-attachments/assets/d2e29010-3b02-4bde-878e-fb697645c55e)
This graph tells the exact magic about how the system works. Basically, RPGGO covers the end2end pipeline from building a game to rendering a game in real time. As a game developer, all you need to do is very simple:
1. find a game you want to make it live in 2D graphic. Either, go to https://creator.rpggo.ai to build your own game if you are a good game designer, or go to https://rpggo.ai game lobby to find a game you like. Remember the game id.
2. fill an [API Key Application form](https://forms.gle/SgYbkZE2aDj38mhT9) with the Game ID you chose.
3. After you get your key, you can use rpggo.js to access the game data and integrate it with your phaser code. This project is also a good example to tell how the integration code will be.

<br>

## ⚡️ Quick Start
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. **install** latest node.js

2. **Clone the GitHub Repository:** Begin by cloning the repository using the command:

   ```
   git clone https://github.com/RPGGO-AI/demo-ai-town.git
   ```

3. **Install Dependencies:** Move into the `demo-ai-town` directory and install the necessary dependencies by running:

   ```
   cd demo-ai-town
   npm i
   ```

4. **Add your api key:** Put it in the right place
   https://github.com/codingtmd/gamify-ai-town/blob/main/src/app/api/rpggo/%5B...path%5D/route.js#L6
   ![image](https://github.com/user-attachments/assets/4eece6ad-d931-405a-9bc3-118e853d2d5a)



5. **Run** the app
   ```
   export NODE_OPTIONS=--openssl-legacy-provider
   ```

   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

    You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

    This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


<br>

## 🐳 Production Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<br>

## ⚖️ License

This project is under CC0, which means you can do anything you want.

<br>

## 👨‍💻‍ Contributors



Made with [contrib.rocks](https://contrib.rocks).

<br>

## 🤝 Acknowledgments


<br>

## 📬 Contact

If you have any questions, feedback, or would like to get in touch, please feel free to reach out to us via email at [dev@rpggo.ai](mailto:dev@rpggo.ai)


## 👁️Learn More

**Next.js**
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


