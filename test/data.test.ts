import { HieroAccountId, HieroTopicId, HieroTransactionId, Timestamp, MemoryBlock } from '../'

describe('AccountId', () => {
    it('constructor', () => {
        let accountId = new HieroAccountId(0, 0, 2)
        expect(accountId.getShardNum()).toEqual(0)
        expect(accountId.getRealmNum()).toEqual(0)
        expect(accountId.getAccountNum()).toEqual(2)
        expect(accountId.getAlias().isEmpty()).toBeTruthy()

        accountId = new HieroAccountId(12711, -21782, 19231)
        expect(accountId.getShardNum()).toEqual(12711)
        expect(accountId.getRealmNum()).toEqual(-21782)
        expect(accountId.getAccountNum()).toEqual(19231)
        expect(accountId.getAlias().isEmpty()).toBeTruthy()

        // copy
        const alias = new MemoryBlock('testalias')
        accountId = new HieroAccountId(0, 0, alias)
        expect(accountId.getAccountNum()).toBeFalsy()
        expect(accountId.getAlias().copyAsString()).toEqual('testalias')
        expect(alias.data()).toBeTruthy()
        expect(alias.data() === accountId.getAlias().data()).toBeFalsy()
    })

    it('toString', () => {
        let accountId = new HieroAccountId(0, 0, 12121)
        expect(accountId.toString()).toEqual('0.0.12121')

        accountId = new HieroAccountId(0, -2, 12132)
        expect(accountId.toString()).toEqual('0.-2.12132')
    })
})

describe('TopicId', () => {
    it('constructor', () => {
        let topicId = new HieroTopicId(0, 0, 17)
        expect(topicId.getShardNum()).toEqual(0)
        expect(topicId.getRealmNum()).toEqual(0)
        expect(topicId.getTopicNum()).toEqual(17)

        topicId = new HieroTopicId('0.-121.18')
        expect(topicId.getShardNum()).toEqual(0)
        expect(topicId.getRealmNum()).toEqual(-121)
        expect(topicId.getTopicNum()).toEqual(18)
    })

    it('toString', () => {
        let topicId = new HieroTopicId(0, 0, 2718)
        expect(topicId.toString()).toEqual('0.0.2718')

        topicId = new HieroTopicId(0, -2, 2819)
        expect(topicId.toString()).toEqual('0.-2.2819')
    })
})

describe('TransactionId', () => {
    it('constructor', () => {
        let transactionId = new HieroTransactionId('0.0.256009@1755503343.736000193')
        expect(transactionId.getAccountId().toString()).toEqual('0.0.256009')
        expect(transactionId.getAccountId().getAccountNum()).toEqual(256009)
        expect(transactionId.getTransactionValidStart().getSeconds()).toEqual(1755503343)
        expect(transactionId.getTransactionValidStart().getNanos()).toEqual(736000193)
    
        transactionId = new HieroTransactionId('0.0.2-17281772-21022')
        expect(transactionId.getAccountId().toString()).toEqual('0.0.2')
        expect(transactionId.getAccountId().getAccountNum()).toEqual(2)
        expect(transactionId.getTransactionValidStart().getSeconds()).toEqual(17281772)
        expect(transactionId.getTransactionValidStart().getNanos()).toEqual(21022)
    })
    
    it('toString', () => {
        let transactionId = new HieroTransactionId(new Timestamp(171627121, 2912), new HieroAccountId(0, 0, 1233))
        expect(transactionId.toString()).toEqual('0.0.1233@171627121.2912')
    })
})

