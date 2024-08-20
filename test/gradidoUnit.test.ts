import { GradidoUnit } from '../'

describe('Gradido Unit Test', () => {
  describe('construct', () => {
    it('empty', () => {
      const gdd = new GradidoUnit()
      expect(gdd).toEqual(GradidoUnit.zero())
      expect(gdd.getGradidoCent()).toEqual(0)
    })

    it('with double', () => {
      const gdd = new GradidoUnit(0.10212)
      // gdd unit work internal with maximal 4 decimal places
      expect(gdd.value()).toEqual(0.1021)
      expect(gdd.toString()).toEqual('0.1021')
    })

    it('with string', () => {
      const gdd = new GradidoUnit('271.2817261')
      // gdd unit work internal with maximal 4 decimal places
      expect(gdd.value()).toEqual(271.2817)
      expect(gdd.toString()).toEqual('271.2817')
    })
  })

  it('calculate decay with many different durations', () => {
    let prevValue = 0
    let prevDistance = 0
    for(let i = 0; i < 31556952 / 32; i += 32) {
      const decayed = GradidoUnit.calculateDecayDirect(1000000, i)
      if (prevValue) {
        expect(prevValue).toBeGreaterThanOrEqual(decayed)
        const distance = prevValue - decayed
        if (prevDistance) {
          expect(prevDistance).toBeGreaterThanOrEqual(distance)
        }
        prevDistance = distance
      }
      prevValue = decayed
    }
  })
})