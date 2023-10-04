import errorHandler from "errorhandler";
import app from './app'


if (process.env.NODE_ENV == "development") {
    app.use(errorHandler())
}

app.listen(app.get('port'), () => {
    console.log('Server is running on port: ', app.get('port'))
})