import { 
  MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER,    
  MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER_FIXED_CASES, 
  MnemonicType_BIP0039_SORTED_ORDER,
  Passphrase,
  MnemonicType_MAX,
  MemoryBlock,
  KeyPairEd25519,
} from '../..'

const passphrases = [
  {
    germanRandomOrder:
      'Fichte Heuschrecke Botschafter G&ouml;ttingen Leasing losfliegen simpel enorm erk&auml;mpft Werk Wolke vorhanden jene Slums stagnieren Verifizieren insgesamt Hanau simpel Inspiration delegieren umtauschen ablegen suggerieren ',
    germanRandomOrderFixedCases: 
      'ankommt gesamt gestorben m&uuml;de sind stolz Enkel geklappt Leonardo riesig Bezugsquelle berauben pr&uuml;fen bislang Villa Fortschritt moralisch unf&auml;hig Enkel erwidern Hanau Plage Fossilien ethnisch ',
    englishSortedOrderBIP0039: 
      'beauty slight skill maze wrap neither table term pizza journey unusual fence mind buzz scrap height critic service table knock fury shrimp curious fog ',
    'pubkeyHex': '6fa7180b132e1248c649fc7b2e422ad57663299f85bd88b8b8031dce28b501a8'
  },
  {
    germanRandomOrder:
      'oftmals bist bietet spalten Datenbank Masse str&auml;flich hervor Derartig Hallo christlich Brief iPhone einpendeln telefonieren musizieren gigantisch Orchester zirkulieren essen gilt Erich Dollar money ',
    germanRandomOrderFixedCases: 
      'Angst ausbeuten besser bekannt Bed&uuml;rfnisse Neidisch virtuell Pension gepr&auml;gt inmitten Abfall Absatzmarkt Wettbewerb Fidel jeder Heinrich Engagement leihen viertel Disziplin zufolge erwarten Iris J&auml;ger ',
    englishSortedOrderBIP0039: 
      'fresh hamster canvas lyrics chat mutual pair color airport estate fly assault suspect deliver similar fancy grass cliff tenant apple divert timber analyst seed ',
    'pubkeyHex': '8943813a623863dd7c5e5b248e408ac8a8851ef758275b6043a06e9b5832c36c'
  },
  {
    germanRandomOrder:
      'tief Acker Abgaben jenseits Revolution verdeckt Entdeckung Sanktion sammeln Umdrehung regulieren murmeln Erkenntnis hart zwar zuspitzen indem fegen bomber zw&ouml;lf Mobbing divers Inspiration Krieg ',
    germanRandomOrderFixedCases: 
      'aushalten absolut signifikant Bezahlung zukunftsf&auml;hig Wurzel ergr&uuml;nden unausweichlich dunkel halb Nagel nehmen Begabung bezwingen wehren Fohlen keiner Krankheit leiblich &Auml;ste Finnland sehen erwidern Abs&auml;tze ',
    englishSortedOrderBIP0039: 
      'rack gentle paddle illness feature fatigue teach ball dust decade dish kick skate income small pill collect often man trap doctor coffee knock excuse ',
    'pubkeyHex': 'd62f14173ae5d66b06753cc9d69d5471913ffc6053feedac2acf901eef3582a9'
  }
]

describe('test passphrases code', () => {
  it('detect mnemonic', () => {
    passphrases.forEach((passphrase) => {
      expect(Passphrase.detectMnemonic(passphrase.germanRandomOrder))
      .toEqual(MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER)
      expect(Passphrase.detectMnemonic(passphrase.germanRandomOrderFixedCases))
      .toEqual(MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER_FIXED_CASES)
      expect(Passphrase.detectMnemonic(passphrase.englishSortedOrderBIP0039))
      .toEqual(MnemonicType_BIP0039_SORTED_ORDER)
    })
    expect(Passphrase.detectMnemonic('Dies ist eine ungültige Passphrase'))
    .toEqual(MnemonicType_MAX);
  })

  it('detect mnemonic with public key', () => {
    passphrases.forEach((passphrase) => {
      const pubkey = MemoryBlock.fromHex(passphrase.pubkeyHex)
      const keyPair = new KeyPairEd25519(pubkey)
      expect(Passphrase.detectMnemonicWithKeyPair(passphrase.germanRandomOrder, keyPair))
      .toEqual(MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER)
      expect(Passphrase.detectMnemonicWithKeyPair(passphrase.germanRandomOrderFixedCases, keyPair))
      .toEqual(MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER_FIXED_CASES)
      expect(Passphrase.detectMnemonicWithKeyPair(passphrase.englishSortedOrderBIP0039, keyPair))
      .toEqual(MnemonicType_BIP0039_SORTED_ORDER)
    })
  })

  it('filter', () => {
    const unfilteredPassphrases = [
			'oftmals bist bietet spalten Datenbank Masse sträflich hervor Derartig Hallo christlich Brief iPhone einpendeln telefonieren musizieren gigantisch Orchester zirkulieren essen gilt Erich Dollar money',
			'Höh, maß, xDäöas',
    ]
	  const filteredPassphrases = [
			'oftmals bist bietet spalten Datenbank Masse str&auml;flich hervor Derartig Hallo christlich Brief iPhone einpendeln telefonieren musizieren gigantisch Orchester zirkulieren essen gilt Erich Dollar money',
			'H&ouml;h ma&szlig; xD&auml;&ouml;as',
    ]
    for(let i = 0; i < 2; i++) {
      expect(Passphrase.filter(unfilteredPassphrases[0])).toEqual(filteredPassphrases[0])
    }
  })

  it('constructAndValid', () => {
    passphrases.forEach((passphraseStrings) => {
      const passphrase = new Passphrase(
        passphraseStrings.germanRandomOrder,
        MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER
      );
      expect(passphrase.checkIfValid()).toBeTruthy()
    })
  })

  it('throw exception', () => {
    expect(() => new Passphrase("Höh, maß, xDäöas", MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER)).toThrow("word don't exist")
  })

  it('createAndTransform', () => {
    passphrases.forEach((passphraseStrings) => {
      const passphrase = new Passphrase(
        passphraseStrings.germanRandomOrder, 
        MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER
      );
      expect(passphrase.checkIfValid()).toBeTruthy()

      const keyPair = KeyPairEd25519.create(passphrase);
      expect(keyPair.getPublicKey().convertToHex()).toEqual(passphraseStrings.pubkeyHex)

      const passphraseEnglish = passphrase.transform(MnemonicType_BIP0039_SORTED_ORDER)
      expect(passphraseEnglish.getString()).toEqual(passphraseStrings.englishSortedOrderBIP0039)

      const passphraseGerman = passphraseEnglish.transform(MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER)
      expect(passphraseGerman.getString()).toEqual(passphraseStrings.germanRandomOrder)

      const passphraseGermanFixed = passphraseGerman.transform(MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER_FIXED_CASES)
      expect(passphraseGermanFixed.getString()).toEqual(passphraseStrings.germanRandomOrderFixedCases)
    })
  })
})

