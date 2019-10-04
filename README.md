# Голосование на блокчейне Waves

Писали всем миром на стриме: https://www.youtube.com/watch?v=B4NiWJQgVJU

Смарт контракт:

```
{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

let owner = base58'<адрес вашего аккаунта>'

@Callable(i)
func vote(v: String) = {
    let dataFromStorage = this.getString(i.callerPublicKey.toBase58String())

    if(dataFromStorage.isDefined())
    then
        throw("Вы уже голосовали")
    else
        WriteSet([DataEntry(i.callerPublicKey.toBase58String(), v)])
}

@Verifier(tx)
func verify() = {
    match tx {
        case t:SetScriptTransaction => sigVerify(tx.bodyBytes, tx.proofs[0], owner)
        case c:InvokeScriptTransaction => true
        case d:DataTransaction => true
        case _ => false
    }
}
```

Вам понадобится ключ youtube api https://console.developers.google.com/apis/credentials

Ключ должен лежать в переменной окружения `YOUTUBE_API`

## Локальная разработка

`npm run watch`

`node server.js`
