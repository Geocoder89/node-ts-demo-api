import mongoose from 'mongoose'
import config from 'config'
import log from './logger'

const connectDB = async ()=> {

    const mongodbUri = config.get<string>("mongodbUrl")
    console.log(mongodbUri,'this is the db uri')
    try {
        
      const connection = await mongoose.connect(mongodbUri)
    
        log.info(`Database connected on:${connection.connection.host}`)
    } catch (error) {
        log.info(error)
        log.error('Could not connect to the db')
        process.exit(1)
    }

}

export default connectDB