const express = require("express")
const bodyParser = require('body-parser');

const app = express()
    //配置静态资源
app.use(express.static("./www"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var initToken = "1jriwrjueiriiiejrietruet2i34935u834u58kwreietu"

//登录 post '/login' 参数：name pass
app.post("/login", (req, res) => {
    const body = req.body;
    if (body.name == "user" && body.pass == "123123") {
        res.send({
            isok: true,
            info: "登录成功",
            token: initToken
        })
    } else {
        res.send({
            isok: false,
            info: "账号或者密码错误"
        })
    }
})

// 开启token验证
app.use((req, res, next) => {
    let token = req.headers.token;
    if (token) {
        if (token === initToken) {
            next()
        } else {
            res.send({
                isok: false,
                info: "请设置正确的token"
            })
        }

    } else {
        res.send({
            isok: false,
            info: "请携带token"
        })
    }
})

app.get("/movie", (req, res) => {

    res.send({
        isok: true,
        data: [{
                id: "1",
                name: "我和我的祖国",
                time: 1595226978883,
                price: 30.00
            },
            {
                id: "2",
                name: "咒怨",
                time: 1585226978883,
                price: 29.99
            },
            {
                id: "3",
                name: "大话西游",
                time: 1575226978883,
                price: 29.90
            },
        ]
    })
})


//获取详情 get '/getDetail' 参数：id
app.get("/getMovieDetail", (req, res) => {
    const query = req.query;
    if (query.id == '1') {
        res.send({
            isok: true,
            detail: {
                id: "1",
                name: "我和我的祖国",
                time: 1595226978883,
                price: 30.00,
                img: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2249139440,2060664326&fm=26&gp=0.jpg"
            },
        })
    }
    if (query.id == '2') {
        res.send({
            isok: true,
            detail: {
                id: "2",
                name: "咒怨",
                time: 1585226978883,
                price: 29.99,
                img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691611422,2486905256&fm=26&gp=0.jpg"
            }
        })
    }
    if (query.id == '3') {
        res.send({
            isok: true,
            detail: {
                id: "3",
                name: "大话西游",
                time: 1575226978883,
                price: 29.90,
                img: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2945530464,3340753895&fm=26&gp=0.jpg"
            }
        })
    }

    res.send({
        isok: false,
        info: "没有此数据",
        detail: null
    })
})

app.get("/foodList", (req, res) => {
    res.send({
        isok: true,
        data: [{
                foodId: 1,
                name: "麻辣烫",
                price: 20.00
            },
            {
                foodId: 2,
                name: "麻辣香锅",
                price: 39.90
            },
            {
                foodId: 3,
                name: "麻辣小龙虾",
                price: 29.99
            },
        ]
    })
})

//
app.get("/getFoodDetail", (req, res) => {
    const query = req.query;
    if (query.foodId == '1') {
        res.send({
            isok: true,
            detail: {
                foodId: 1,
                name: "麻辣烫",
                price: 20.00
            },
        })
    }
    if (query.foodId == '2') {
        res.send({
            isok: true,
            detail: {
                foodId: 2,
                name: "麻辣香锅",
                price: 39.90
            },
        })
    }
    if (query.foodId == '3') {
        res.send({
            isok: true,
            detail: {
                foodId: 3,
                name: "麻辣小龙虾",
                price: 29.99
            },
        })
    }

    res.send({
        isok: false,
        info: "没有此数据",
        detail: null
    })
})

console.log("你的项目启动在localhost:3000")
app.listen(3000)