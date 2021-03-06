const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//добавляем таблици
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  name: { type: DataTypes.STRING }
});

// const Basket = sequelize.define("basket", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
// });
// const BasketDevice = sequelize.define("basket_device", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
// });

// const Device = sequelize.define("device", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, unique: true, allowNull: false },
//   price: { type: DataTypes.INTEGER, allowNull: false },
//   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
//   img: { type: DataTypes.STRING, allowNull: false }
// });
//
// const Type = sequelize.define("type", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, unique: true, allowNull: false }
// });
// const Brand = sequelize.define("brand", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, unique: true, allowNull: false }
// });
//
// const DeviceInfo = sequelize.define("device_info", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING, allowNull: false },
//   description: { type: DataTypes.STRING, allowNull: false }
// });
//
// const TypeBrand = sequelize.define("type_brand", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
// });

const Travel = sequelize.define("travel", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const TravelSight = sequelize.define("travel-sight", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  visited:{type:DataTypes.BOOLEAN, defaultValue:false},
});

const Sight = sequelize.define("sight", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT },
  address: { type: DataTypes.STRING, allowNull: false },
});
const City = sequelize.define("city", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT }
});
const Country = sequelize.define("country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT }
});

const Photo = sequelize.define("photo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  review: { type: DataTypes.STRING },
  grade: { type: DataTypes.INTEGER, allowNull: false  }
});
const Error = sequelize.define("error", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  verified:{type:DataTypes.BOOLEAN, defaultValue:false},
  email: { type: DataTypes.STRING},
});
const Like = sequelize.define("like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  like:{type:DataTypes.BOOLEAN},
});

// //описываем связи
// User.hasOne(Basket);
// Basket.belongsTo(User);
//
// Basket.hasMany(BasketDevice);
// BasketDevice.belongsTo(Basket);
//
// Type.hasMany(Device);
// Device.belongsTo(Type);
//
// Brand.hasMany(Device);
// Device.belongsTo(Brand);
//
// // Device.hasMany(Rating);
// // Rating.belongsTo(Device);
//
// Device.hasMany(BasketDevice);
// BasketDevice.belongsTo(Device);
//
// Device.hasMany(DeviceInfo, { as: "info" });
// DeviceInfo.belongsTo(Device);
//
// Type.belongsToMany(Brand, { through: TypeBrand });
// Brand.belongsToMany(Type, { through: TypeBrand });


//new
User.hasMany(Travel);
Travel.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Rating.hasMany(Like,{ as: "like", onDelete: 'cascade',
  hooks: true });
Like.belongsTo(Rating);

Sight.hasMany(Rating,{ as: "rating", onDelete: 'cascade',
  hooks: true });
Rating.belongsTo(Sight);


Sight.hasMany(Photo,{ as: "photo", onDelete: 'cascade',
  hooks: true });
Photo.belongsTo(Sight);


City.hasMany(Sight,{ as: "sight", onDelete: 'cascade',
  hooks: true });
Sight.belongsTo(City);


Country.hasMany(City,{ as: "city", onDelete: 'cascade',
  hooks: true });
City.belongsTo(Country);

Travel.hasMany(TravelSight,{ as: "TravelSight" , onDelete: 'cascade',
  hooks: true});
TravelSight.belongsTo(Travel);

Sight.hasMany(TravelSight,{ onDelete: 'cascade',
  hooks: true});
TravelSight.belongsTo(Sight);

module.exports = {
  // Basket,
  // User,
  // BasketDevice,
  // Device,
  // Type,
  // Brand,
  // Rating,
  // DeviceInfo,
  // TypeBrand,
  //new
  User,
  Travel,
  TravelSight,
  Sight,
  Country,
  City,
  Photo,
  Rating,
  Like,
  Error

};
