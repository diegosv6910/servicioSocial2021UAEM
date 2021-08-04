// Comportamiento raiz.
router.get('/', (req, res)=>{
  res.send('Hello');
});


// exportamos nuestro nuevo router
module.exports = router;