
## memo

```zsh
olivine % npm run dev

> olivine@0.0.0 dev
> sst dev

Please enter a name you’d like to use for your personal stage. Or hit enter to use sig: 
✔ Deploying bootstrap stack, this only needs to happen once
SST v2.2.4  ready!

➜  App:     olivine
   Stage:   sig
   Console: https://console.sst.dev/olivine/sig

✔  Deployed:
   API
   GraphQlAPiUrl: https://brncfsvbgvbgnlbx4ghrepkcg4.appsync-api.ap-northeast-1.amazonaws.com/graphql
   GraphQlApiId: nijucn3dpjatbpcnpov6g2b3oy
   GraphQlApiKey: da2-q6sqpfsz7ffnzjrt6ynyarfsna
   RestApiEndpoint: https://16o5pi776d.execute-api.ap-northeast-1.amazonaws.com
```

```zsh
olivine % npx sst deploy --stage prod
SST v2.2.4

➜  App:     olivine
   Stage:   prod
   Region:  ap-northeast-1
   Account: 669848076490

✔  Deployed:
   API
   GraphQlAPiUrl: https://bdci42bp7fdehlcibzs5xnmtb4.appsync-api.ap-northeast-1.amazonaws.com/graphql
   GraphQlApiId: 44ffyz66xrdh5a2ih4nkfftude
   GraphQlApiKey: da2-x4m3gv7jivgohgk72y2il5qcxq
   RestApiEndpoint: https://2a9zjiuuu8.execute-api.ap-northeast-1.amazonaws.com
```

## 参考

 - https://sst.dev/examples/how-to-create-a-serverless-graphql-api-with-aws-appsync.html

