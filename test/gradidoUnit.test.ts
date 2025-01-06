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
    let prevValue = GradidoUnit.zero()
    let prevDistance = GradidoUnit.zero()
    
    for(let i = 0; i < 31556952 / 32; i += 32) {
      // const percent = Math.round(i / (31556952 * 2) * 100)
      // process.stdout.write("\r" + percent + "%")
      const decayed = GradidoUnit.fromGradidoCent(100000000).calculateDecay(i)
      if (prevValue.gt(GradidoUnit.zero())) {
        expect(prevValue.getGradidoCent()).toBeGreaterThanOrEqual(decayed.getGradidoCent())
        const distance = prevValue.sub(decayed)
        if (prevDistance.gt(GradidoUnit.zero())) {
          expect(prevDistance.sub(distance).getGradidoCent()).toBeLessThanOrEqual(1)
        }
        prevDistance = distance
      }
      prevValue = decayed
    }
  })
  it('test reverse decay', () => {
    const startValue = GradidoUnit.fromGradidoCent(1000000);
    for (let i = 1; i < 31556952 / 32; i += 32) {
      const valueWithDecay = startValue.calculateDecay(-i);
      const decay = valueWithDecay.calculateDecay(i);
      expect(Math.abs(startValue.sub(decay).getGradidoCent())).toBeLessThanOrEqual(1);
    }
  });  
})