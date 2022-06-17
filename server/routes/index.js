const Router=require('express')
const router= new Router()
const brandRouter=require('./brandRouter')
const deviceRouter=require('./deviceRouter')
const typeRouter=require('./typeRouter')
const userRouter=require('./userRouter')

const travelRouter=require('./travelRouter')
const ratingRouter=require('./ratingRouter')
const errorRouter=require('./errorRouter')
const countryRouter=require('./countryRouter')
const cityRouter=require('./cityRouter')
const sightRouter=require('./sightRouter')
//роутеры главные
router.use('/user',userRouter)
router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/device',deviceRouter)

router.use('/travel',travelRouter)
router.use('/rating',ratingRouter)
router.use('/error',errorRouter)
router.use('/country',countryRouter)
router.use('/city',cityRouter)
router.use('/sight',sightRouter)

module.exports=router
