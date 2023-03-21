## 動作環境

動くことを確認できているNodeバージョンは下記

 - 16.x.x
 - 18.x.x

### もしNode v18を導入するなら

nvm導入済みなら下記でインストール＆切り替え可能。

```zsh
# Node v18導入
nuxt3-starter-01 % nvm install 18
Downloading and installing node v18.15.0...
Downloading https://nodejs.org/dist/v18.15.0/node-v18.15.0-darwin-arm64.tar.xz...
############################################################# 100.0%
Computing checksum with shasum -a 256
Checksums matched!
Now using node v18.15.0 (npm v9.5.0)

# 使用するNodeをv18に切り替え
nuxt3-starter-01 % nvm use 18
Now using node v18.15.0 (npm v9.5.0)

# 切り替えできたか確認
nuxt3-starter-01 % node -v
v18.15.0
```

切り替え後はnpm run devする前に、node_modulesと.nuxtを削除してから再度npm i && npm run devすると良い。

## 使い方

```zsh
# 環境構築
git clone https://github.com/shigeru-hyodo/nuxt3-starter-01
npm i

# Nuxt3起動
npm run dev

# Storybook起動
npm run storybook
```

上記の他、Cognitoによる認証を試したいなら、 `.env` を自環境向けに新規作成すること。なお `.env` にどんなことを書くべきかの例として、 `.env.example` を用意している。

## セットアップ（このリポジトリではセットアップ実施済み）

```zsh
# Nuxt3雛形作成
npx nuxi init nuxt3-starter-01

# nuxt-graphql-client導入
npm i -D nuxt-graphql-client

# ESLint導入
npm i -D @nuxt/eslint-config @nuxtjs/eslint-config-typescript eslint eslint-plugin-tailwindcss eslint-plugin-import eslint-plugin-unused-imports

# Nuxt3対応のTailwind CSS導入
npm i -D @nuxtjs/tailwindcss

# VueUse導入
npm i -D @vueuse/nuxt @vueuse/core

# FormKit導入
npm i -D @formkit/vue @formkit/nuxt

# aws-amplify導入
# https://github.com/aws-amplify/amplify-js/issues/9671
# https://www.youtube.com/watch?v=46DxCr5w1u0
npm i -D aws-amplify @aws-amplify/ui-vue

# Storybook導入
npx sb init --type vue3 --builder @storybook/builder-vite
# https://github.com/storybookjs/storybook/issues/17274#issuecomment-1145117752
npm i -D @vitejs/plugin-vue-jsx
# 上記だけではStorybook上でmdxを動かせないのでreact導入
npm i -D react react-dom
# Tailwind CSSをStorybookに導入（Storybook用に別途tailwindcssパッケージを入れている）
npm i -D tailwindcss @tailwindcss/postcss7-compat
# Storybook上でNuxt3同様に自動インポートが効くようにしたい
npm i -D unplugin-vue-components unplugin-auto-import

# Storybook v7へアップデート
npx sb@next upgrade --prerelease
```

## 推奨するVSCode拡張機能

拡張機能IDで列挙する。

 - unifiedjs.vscode-mdx
 - dbaeumer.vscode-eslint
 - bradlc.vscode-tailwindcss
 - austenc.tailwind-docs
 - Vue.volar
 - GraphQL.vscode-graphql
 - GraphQL.vscode-graphql-execution
 - GraphQL.vscode-graphql-syntax

## TIPS

### Nuxt3開発時にいつもやっておきたいこと

npm run devを起動しっぱなしにしておくのが吉。

これはNuxt3が、npm run dev時に.nuxtディレクトリを作成して、その中にcomponentsディレクトリで定義したカスタムコンポーネントやそのほか組み込み関数等を配置するためである。

つまりたとえば、npm run devを起動していない時に追加したカスタムコンポーネントは、npm run devしない限りコード補完で出てこない。よってnpm run devを常時起動しっぱなしにしておいて損はない。

### mdx等をVSCodeで書くときに、行が折り返してくれずに見づらい

Mac版VSCodeならoption+zで行の自動折り返しが有効になる。

これはファイル形式を問わない機能で、ちょくちょく使う機会もあるので覚えておいて損はないかも。

## トラブルシューティング

### storybook導入後、npm run storybookでエラーになった

~いくつかのパターンがあるが、webpack云々のエラーならnode_modulesとpackage-lock.jsonを一度削除して、再度npm iすることで治るケースもある。~

……が、しかし、この方法で直すと、 **「nuxt-graphql-client」や「graphql-codegen」が動かない（厳密にはcodegenのtypescript-operationsプラグインが動かない）** 状態になってしまうので、代わりに **`npx sb@next upgrade --prerelease` でStorybook v7に更新することでエラーを直した。**

エラー例は下記。

```zsh
nuxt3-starter-01 %  npm run storybook       

> storybook
> start-storybook -p 6006

info @storybook/vue3 v6.5.16
info 
info => Loading presets

info => Ignoring cached manager due to change in manager config
ℹ ｢wdm｣: wait until bundle finished: 
/Users/sig/work/myrepo/nuxt3-starter-01/node_modules/html-webpack-plugin/lib/webpack5/file-watcher-api.js:13
    mainCompilation.fileSystemInfo.createSnapshot(
                                   ^

TypeError: Cannot read properties of undefined (reading 'createSnapshot')
    at /Users/sig/work/myrepo/nuxt3-starter-01/node_modules/html-webpack-plugin/lib/webpack5/file-watcher-api.js:13:36
    at new Promise (<anonymous>)
    at Object.createSnapshot (/Users/sig/work/myrepo/nuxt3-starter-01/node_modules/html-webpack-plugin/lib/webpack5/file-watcher-api.js:12:10)
    at /Users/sig/work/myrepo/nuxt3-starter-01/node_modules/html-webpack-plugin/lib/cached-child-compiler.js:219:35
```
