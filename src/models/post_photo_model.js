const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs"); // modulo de I/O do node
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const PostPhotoSchema = new mongoose.Schema({
    name: String, // nome da foto
    key: String, // nome da photo + a hash gerada
    url: String // url da foto
});

PostPhotoSchema.pre("save", function() {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

PostPhotoSchema.pre("remove", function() {
    if (process.env.STORAGE_TYPE === "s3") {
        return s3
            .deleteObject({
                Bucket: process.env.BUCKET_NAME,
                Key: this.key
            })
            .promise();
    } else {
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    }
});

module.exports = mongoose.model("PostPhoto", PostPhotoSchema);
