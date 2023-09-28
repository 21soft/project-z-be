import errorHandler from "errorhandler";
import app from './app'
import db from './config/database'


if (process.env.NODE_ENV == "development") {
    app.use(errorHandler())
}

db.call('')

app.listen(app.get('port'), () => {
    console.log('Server is running on port: ', app.get('port'))
})