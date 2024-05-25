const axios = require('axios')
const fs = require('fs')

const schemas = []

const run = async () => {
  traversAndCollectSchemas('./')

  const payload = {
    appName: 'structurize-test',
    accountId: '664e8e929e291c082d448352',
    jsonArray: schemas,
  }

  await axios({
    url: 'http://localhost:3040/schemas/v1',
    method: 'POST',
    data: payload,
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRlOGU5MjllMjkxYzA4MmQ0NDgzNTMiLCJhY2NvdW50SWQiOiI2NjRlOGU5MjllMjkxYzA4MmQ0NDgzNTIiLCJyb2xlTmFtZSI6ImRldmVsb3BlciIsImlhdCI6MTcxNjQyNDM0MX0.W6M_3ZAOpHj2fJEFq3XqLinP_G0P0z2uAxsybgU_t8k'
    }
  })
}

const traversAndCollectSchemas = (path) => {
  fs.readdirSync(path).forEach(f => {
    const info = fs.statSync(path + f)
    
    if (f.includes('structurize.json')) {
      const json = fs.readFileSync(path + f, 'utf-8')

      const parsed = JSON.parse(json)

      schemas.push(parsed);
    }

    if (info.isDirectory() && f !== 'node_modules') {
      traversAndCollectSchemas(path + f + '/')
    }
  })
}

run()
