const Tour = require('../models/tourModel'); // make sure this exists
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
//const AppError = require('../utils/appError');
//const { deleteOne } = require('../models/reviewModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage';
  req.query.fields = 'name price  summary diffifulty';
  next();
};

exports.getAllTours = factory.getAll(Tour);

//EXECUTE QUERY

exports.getTour = factory.getOne(Tour, { path: 'reviews' });

exports.postTour = factory.createOne(Tour);

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res) => {
  const minRating = Number(req.query.minRating) || 0;

  const stats = await Tour.aggregate([
    // {
    //   $match: { ratingsAverage: { $gte: minRating } },
    // },
    {
      $group: {
        _id: null,
        numTours: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numTours: -1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
