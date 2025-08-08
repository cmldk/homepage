---
title: '[TR] Truffle Suite'
description: '[TR] Ethereum Test ağlarından birisi olan Ropsten, geliştiriciler için Testnet ortamı sunuyor. Bizde Truffle Suite kullanarak oluşturduğumuz akıllı kontrat örneğini Ropsten Test Ağına deploy işlemini gerçekleştirip, bu kontrat içerisindeki fonksiyonları ağ üzerinden test edeceğiz.'
date: 'Mar 07 2021'
---

# Truffle Suite kullanarak Ethereum Ropsten Test Ağı üzerinde akıllı kontrat geliştirme

![](https://cdn-images-1.medium.com/max/2400/1*jEthtaWt06n_k6RnfqPP3Q.png)

Bildiğimiz gibi Ethereum bir blokzincir ağıdır. Bu ağ üzerinde akıllı kontratlar ile işlemler yapılabilmektedir. Akıllı kontratlar Solidity programlama dili ve Remix kullanılarak geliştirilebileceği gibi son yıllarda geliştiricilerin test ve geliştirme ortamları için kullandığı bir araç olan Truffle Suite mevcut. Ethereum için tamamen yerel bilgisayarınızda oluşturulmuş bir geliştirme ağ ortamı sunuyor. Böylece akıllı sözleşmelerinizi oluşturup kendi örnek ağınız üzerinde test etmenize olanak sağlıyor.

## Peki Biz Ne Yapacağız?

Ethereum Test ağlarından birisi olan Ropsten, geliştiriciler için Testnet ortamı sunuyor. Bizde Truffle Suite kullanarak oluşturduğumuz akıllı kontrat örneğini Ropsten Test Ağına deploy işlemini gerçekleştirip, bu kontrat içerisindeki fonksiyonları ağ üzerinden test edeceğiz.

### Gereksinimler

[Truffle Suite](https://www.trufflesuite.com/docs/truffle/overview), [MetaMask](https://metamask.io/), [HDWalletProvider](https://github.com/trufflesuite/truffle/tree/master/packages/hdwallet-provider), [Infura.io](https://infura.io/)

## Truffle Kurulum

İlk olarak Truffle kurulumu için gerekli olan [NodeJS](https://nodejs.org/en/download/current/) kurulumunu gerçekleştirmemiz gerekiyor. Eğer kurulu ise versiyonun 8.9.4 veya üzeri olduğuna dikkat etmelisiniz. Kurulumu bilgisayarınızdaki terminal üzerinden aşağıdaki şekilde kontrol edebilirsiniz.

```bbcode
$ node --version
v14.15.5
```

NodeJS kurulumunun ardından Truffle kurulumunu gerçekleştirip,

```bbcode
$ npm install -g truffle
```

kurulumu aşağıdaki şekilde kontrol edebilirsiniz.

```bbcode
$ truffle version
Truffle v5.2.2 (core: 5.2.2)
Solidity v0.5.16 (solc-js)
Node v14.15.5
Web3.js v1.2.9
```

Ardından örnek proje için istediğimiz dizin altında kurulumu oluşturabiliriz.

```bbcode
mkdir TruffleRopstenTest
cd TruffleRopstenTest
$ truffle init
```

Komutun ardından Truffle tarafından 3 adet klasör ve 1 adet dosya oluşturulacak.

- `contracts` : Solidity kontratları için oluşturulan klasör
- `migrations` : Deploy işlemleri için oluşturulan klasör
- `test` : Uygulama veya kontratların testleri için oluşturulan klasör
- `truffle-config.js` : Truffle konfigürasyon dosyası

## MetaMask

Test Ağına dahil olmak istiyorsak eğer Ethereum Ağı için oluşturulmuş [MetaMask](https://metamask.io/download.html) indirip, bir hesap oluşturmamız gerekiyor. Bu sayede Ağ içerisinde yapacağımız işlemler için kim olduğumuzu gösterebileceğiz. MetaMask’ı desteklediği web tarayıcıları üzerinden kolayca eklenti olarak indirebilirsiniz.

Bize bu süreç için gerekli olan ilk bilgilerden birisi MetaMask hesabımızdaki hesap detayları kısmından elde edeceğimiz gizli anahtar (private key) bilgimiz (kimseyle paylaşmamaya çalışın). MetaMask hesabımıza giriş yaptıktan sonra aşağıdaki görselleri takip ederek elde edebilirsiniz.

![](https://cdn-images-1.medium.com/max/2000/1*P8g6cZhJGsMWktAvaQqWhA.png)

![](https://cdn-images-1.medium.com/max/2000/1*dDx2ohd9pWecvcW6IVSU4A.png)

Özel anahtarı ver butonuna bastıktan sonra şifrenizi girerek özel anahtarınızı öğrenebilirsiniz.

Ayrıca Ropsten Test Ağında yapacağımız işlemler için test Ether’e ihtiyacımız var. MetaMask hesap adresimizle [https://faucet.ropsten.be/](https://faucet.ropsten.be/) adresinden test Ether talebinde bulunabiliriz (gelmesi biraz sürebilir). Eğer test Ether’iniz yoksa işlem gerçekleştiremezsiniz.

![MetaMask hesap adresi(public key)](https://cdn-images-1.medium.com/max/2000/1*Ntpk2fruowRB-m36rxeY8g.png)

![Test Ether [https://faucet.ropsten.be/](https://faucet.ropsten.be/)](https://cdn-images-1.medium.com/max/2688/1*R-CNTezQ8AmfrR8rOjQduA.png)

## HDWalletProvider Kurulum

Ropsten Test Ağına dahil olmak için kendimizi tanıtmamız gerektiğini söylemiştim. HDWalletProvider bir Web3 sağlayıcısı olarak, hesabımız ile ağ üzerinde aracı özelliği görerek yaptığımız işlemleri imzalama görevini üstlenecek.

İlk olarak NPM paket kurulumunu proje dosyası içerisinde oluşturalım,

```bbcode
TruffleRopstenTest$ npm init
```

ardından HDWalletProvider’ı indirebiliriz.

```bbcode
TruffleRopstenTest$ npm install @truffle/hdwallet-provider
```

## Infura.io

Blokzincir uygulamaları eşler arası bağlantıya ihtiyaç duyduğu gibi depolama alan ihtiyacı olarak da maliyetli olabilmektedir. Infura.io, API paketi ile Ethereum ve IPFS ağlarına anında HTTPS ve WebSocket erişimi sağlıyor. Bu sayede hızlı ve kolay bir şekilde merkezi olmayan uygulamalar geliştirebiliriz.

Bu süreçte gerekli olan ikinci ve son bilgiyi ise bu kısımda elde edeceğiz. [Infura.io](https://infura.io/) adresinden bir hesap oluşturup, bu hesap içerisinde Ethereum kısmından bir proje oluşturmamız gerekiyor. Oluşturduğumuz projenin ID’si (Project ID) bizim için gerekli olan ikinci bilgi olacak. Bu bilgiyi projenin ayarlar kısmından kopyalayabilirsiniz.

![infura.io](https://cdn-images-1.medium.com/max/2690/1*meKV6D8hEHX14hGrsGGFuw.png)

## Truffle Konfigürasyon

Artık gereksinimleri karşıladığımıza göre uygulama kısmına geçebiliriz. Bu uygulama için basit bir akıllı sözleşme örneği oluşturup bunun üzerinden ilerleyeceğiz.

Öncelikle bilgisayarımızda oluşturduğumuz **TruffleRopstenTest** klasörünün içindeki **_contracts_** klasöründe **_SimpleStorage.sol_** dosyası oluşturuyoruz. Bunun için tercih ettiğiniz bir editörü kullanabilirsiniz. Bu dosya bizim akıllı kontrat örneğimiz olacak. Temel yapısı, herhangi bir değer olarak verilen sayıyı kaydedip bu sayıyı gösterebileceğimiz bir kontrat örneğidir.

```sol linenumber
pragma solidity ^0.6.0;

contract SimpleStorage {

   uint256 number;

   function store(uint256 num) public {
       number = num;
   }

   function retrieve() public view returns (uint256){
       return number;
   }
}
```

Ardından **_migrations_** klasörü içerisinde **_2_deploy.js_** dosyası oluşturmamız gerekiyor. Bu dosyanın içeriği şu şekilde olmalı.

```js linenumber
const SimpleStorage = artifacts.require('SimpleStorage');

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
```

Sıradaki adım ise **_truffle-config.js_** dosyası içerisinde Ropsten Test Ağımızın konfigürasyonunu yapmamız gerekiyor. Bazı kısımlar Truffle tarafından default olarak tanımlanmış olabilir. Yorum satırından çıkartarak kullanabilirsiniz.

```js linenumber
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { projectId, privateKey } = require('./secrets.json');

module.exports = {
  networks = {
     ropsten: {
       provider: () => new HDWalletProvider(privateKey, `https://ropsten.infura.io/v3/${projectId}`),
       network_id: 3,
       gas: 5500000,
       confirmations: 2,
       timeoutBlocks: 200,
       skipDryRun: true
     }
  },
  compilers: {
     solc: {
        version: "^0.6.0",
     }
  },
}
```

Son adım olarak proje klasörünün içerisinde **_secrect.json_** dosyası oluşturuyoruz. Burada HDWalletProvider için gerekli olan proje ID’si ve MetaMask hesabınızın gizli anahtar(private key) bilgisini JSON dosyası olarak tutacağız. Örnek olarak paylaşılan dosyada kendi bilgileriniz ile değiştirmeniz gerekiyor.

```json linenumber
{
  "privateKey": "eda4c7b04e7c9654b330503ad...",
  "projectId": "960845f27..."
}
```

Artık kontratımızı Testnet’e deploy edip, test işlemini gerçekleştirebiliriz.

```bbcode
TruffleRopstenTest$ truffle migrate --network ropsten
```

![Kontrat deploy işlemi(transaction) çıktısı](https://cdn-images-1.medium.com/max/2000/1*VLltBqtTkb7PNxTFSgTOqQ.png)

Testnet üzerinde ilk işlemimizi yapmış bulunuyoruz. İsterseniz [https://ropsten.etherscan.io/](https://ropsten.etherscan.io/) üzerinden terminalde çıkan **_transaction hash_** değerini girerek kontrat oluşumunu görebilirsiniz. Etherscan.io, Ethereum ağında oluşturulan bütün blok, token, transaction vb. işlemleri görebileceğimiz bir websitedir.

Kontrat kurulumunu yaptığımıza göre artık akıllı kontratımızın içerisindeki fonksiyonları test edebiliriz.

```bbcode
TruffleRopstenTest$ truffle console --network ropsten
truffle(ropsten)> SimpleStorage = await SimpleStorage.deployed()
undefined
truffle(ropsten)> SimpleStorage.store(34)
truffle(ropsten)> (await SimpleStorage.retrieve()).toString()
```

![Sayı değerimizin kayıt ve gösterme işlemi](https://cdn-images-1.medium.com/max/2770/1*14f266rtCwnmYrlIk_koTg.png)

> **Note:**
> Bu işlemi de [https://ropsten.etherscan.io/](https://ropsten.etherscan.io/) adresi üzerinden **tx(transaction hash)** değerini girerek görebilirsiniz.

## Sonuç

Truffle kullanarak nasıl Ropsten Testnet üzerinde akıllı kontratlarla çalışabilirizin küçük bir uygulamasını gerçekleştirmiş olduk.

Projenin github sayfasını [linkten](https://github.com/cmldk/bc-smartcontractdev/tree/main/TruffleRopstenTest) inceleyebilirsiniz.

Ayrıca bu konu ile alakalı başka bir örnek github çalışması incelemek isterseniz [linkten](https://github.com/cmldk/bc-smartcontractdev/tree/main/ERC20-mytoken) inceleyebilirsiniz.

Yazının Medium linkine [buradan](https://medium.com/@cemaldak/truffle-suite-kullanarak-ethereum-ropsten-test-a%C4%9F%C4%B1-%C3%BCzerinde-ak%C4%B1ll%C4%B1-kontrat-geli%C5%9Ftirme-2b21b85398d9) ulaşabilirsiniz.
