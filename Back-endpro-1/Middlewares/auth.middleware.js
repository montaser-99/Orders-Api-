import jwt from 'jsonwebtoken'
import util from 'util'
import User from '../Models/User.model.js'
const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: "Fail", message: "Token required" });
    }

    const decoded = await util.promisify(jwt.verify)(token, process.env.SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.tokens?.includes(token)) {
      return res.status(401).json({ status: "Fail", message: "Invalid token" });
    }

    req.user = user;
    req.session = req.session || {};
    req.session.role = user.role;
    req.session._id = user._id;

    next();
  } catch (error) {
    res.status(401).json({
      status: "Fail",
      message: "You're not authenticated",
      error: error.message
    });
  }
};

const restrictTo = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.session.role)) {
      return res.status(403).json({
        message: "You're Not Authorized"
      });
    }
    next();
  };
};

export {
  authentication,
  restrictTo
};
