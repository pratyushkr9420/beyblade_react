const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/beyblade_db')

const Character = conn.define('character',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    role:{
        type:Sequelize.ENUM('BEYBLADER','BITBEAST')
    },
    specialAttack:{
        type:Sequelize.STRING
    },
    bitType:{
        type:Sequelize.ENUM('FIRE','WATER','EARTH','THUNDER','WIND')
    }
})

Character.belongsTo(Character,{as:'blader'})
Character.hasMany(Character,{as:'bitbeasts'})

module.exports = {
    conn,
    Character
}