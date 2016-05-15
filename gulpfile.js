var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('./public/asset/img/*.*') // source path of the sprite images
            .pipe(spritesmith({
                imgName: 'sprite.png',
                imgPath: '/asset/img/sprite/sprite.png',
                cssName: 'sprite.scss',
            }));

    spriteData.img.pipe(gulp.dest('./public/asset/img/sprite')); // output path for the sprite
    spriteData.css.pipe(gulp.dest('./public/asset/css/sprite')); // output path for the CSS
});

gulp.task('default', ['sprite']);
