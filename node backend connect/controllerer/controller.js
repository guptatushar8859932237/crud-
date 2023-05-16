const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getdata = require('../mmodal/modals')
const userData = require('../mmodal/modalemployeedata')
const SECRET_KEY = 'api'
const data = require('../mmodal/modals')


const mydata = (req, res) => {
    getdata.find().then((err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
}

const postdata = async (req, res) => {
    try {
        const { username, password, email, confirmPassword } = req.body

        const user = getdata({
            username: username,
            password: password,
            email: email,
            confirmPassword: confirmPassword
        })
        await user.save().then(() => {
            res.json({ message: "Registration successfully", success: true })
        })
    } catch {
        res.json({ message: "Registration un-successfully", success: false })
    }
}

const loginData = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await getdata.find({ email: email, password: password });
        if (user.length > 0) {
            res.json({ message: "registration success", success: true })
        } else {
            res.json({ message: "registration does not happen", success: false })
        }
    } catch {
        res.json("some thing went wrong")
    }
}
const updatedata = async (req, res) => {
    try {
        let { _id } = req.body;
        id = new mongoose.Types.ObjectId(_id);
        const { username, password, email, confirmPassword } = req.body

        await getdata.findByIdAndUpdate(_id, {
            "username": username,
            "password": password,
            "email": email,
            "confirmPassword": confirmPassword
        }).then(() => {
            res.json("record update")
        })
    }
    catch {
        res.json("record not update")
    }
}
const signupdata = async (req, res) => {
    try {
        const { username, password, email, confirmPassword } = req.body
        const existinguser = await getdata.findOne({ email: email })
        if (existinguser) {
            res.json({ message: "this email is already used ", success: false })
        } else {
            const hashpassword = await bcrypt.hash(password, 10)
            const user = await getdata.create({
                username: username,
                password: hashpassword,
                email: email,
                confirmPassword: confirmPassword
            })
            const token = jwt.sign({ email: user.email }, SECRET_KEY)
            res.json({ message: 'data posted', success: true, token: token })
        }

    } catch {
        res.json("something went wrong")
    }
}
const emplodata = async (req, res) => {
    try {
        const { firstname, lastname, email, contact, address, department } = req.body
        const employee = userData({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            address: address,
            department: department
        })
        await employee.save().then(() => {
            res.json({ message: 'data stored', success: true })
        })
    } catch {
        res.json({ message: 'data does not stored', success: false })
    }
}
const employeeGet = (req, res) => {
    userData.find().then((err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
}
const loginhash = async (req, res) => {
    try {
        const { email, password } = req.body
        const existinguser = await data.findOne({ email: email })
        if (!existinguser) {
            return res.json({ message: 'email does not found ', success: false })
        } else {
            const userpassword = await bcrypt.compare(password, existinguser.password)
            if (!userpassword) {
                res.json('invalid password')
            }
            const token = await jwt.sign({ email: existinguser }, SECRET_KEY)
            res.json({ message: 'login success', success: true, token: token })
        }
    } catch {
        res.json("something went wrong")
    }
}

const getDataById = async (req, res) => {
    try {
        const { id } = req.params;
        await userData.findById(id).then((err, data) => {
            if (err) {
                res.json(err)
            } else {
                res
                res.json(data)

            }
        })

    } catch {
        res.json("somrthing get wrong")
    }
}

const updategetdata = async (req, res) => {
    try {
        let { _id } = req.body;
        // id =  mongoose.Types.ObjectId(_id);
        const { firstname, lastname, email, contact, address, department } = req.body

       const userUpdate =  await userData.findByIdAndUpdate(_id, {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "contact": contact,
            "address": address,
            "department": department
        })
        res.json({message: "updated", success:true, data :userUpdate})
    }
    catch {
        res.json("record not update")
    }
}


const handledelete= async (req, res) => {
    try {
        let {id } = req.params;
        // id =  mongoose.Types.ObjectId(_id);

       await userData.findByIdAndDelete(id).then(()=>{
        res.json({message: "delete", success:true})
       })
       
    }
    catch {
        res.json("record not update")
    }
}


module.exports = { mydata, updatedata, loginhash, signupdata, emplodata, employeeGet, getDataById, updategetdata, handledelete };
