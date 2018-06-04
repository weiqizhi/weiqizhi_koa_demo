async function route1(ctx,next){
  ctx.state.data = {
    msg : 'this is route1'
  }
  await next();
}

async function route2(ctx,next){
  ctx.state.data = {
    msg : 'this is route2'
  }
}

module.exports = {
  route1,
  route2
}


