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
const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false }
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});
const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

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
  lat: { type: DataTypes.INTEGER },
  lng: { type: DataTypes.INTEGER },
  address: { type: DataTypes.STRING, allowNull: false },
});
const City = sequelize.define("city", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  lat: { type: DataTypes.INTEGER },
  lng: { type: DataTypes.INTEGER }
});
const Country = sequelize.define("country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  lat: { type: DataTypes.INTEGER },
  lng: { type: DataTypes.INTEGER }
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

//описываем связи
User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });


//new
User.hasMany(Travel);
Travel.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Rating.hasMany(Like);
Like.belongsTo(Rating);

Sight.hasMany(Rating,{ as: "rating" });
Rating.belongsTo(Sight);


Sight.hasMany(Photo,{ as: "photo" });
Photo.belongsTo(Sight);


City.hasMany(Sight,{ as: "sight" });
Sight.belongsTo(City);


Country.hasMany(City,{ as: "city" });
City.belongsTo(Country);



Travel.belongsToMany(Sight, { through: TravelSight });
Sight.belongsToMany(Travel, { through: TravelSight });

Country.hasMany(Photo,{ as: "photo" });
Photo.belongsTo(Country);

City.hasMany(Photo,{ as: "photo" });
Photo.belongsTo(City);

Country.hasMany(Rating,{ as: "rating" });
Rating.belongsTo(Country);

City.hasMany(Rating,{ as: "rating" });
Rating.belongsTo(City);

module.exports = {
  Basket,
  // User,
  BasketDevice,
  Device,
  Type,
  Brand,
  // Rating,
  DeviceInfo,
  TypeBrand,
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
