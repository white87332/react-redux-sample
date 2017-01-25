import request from 'superagent';
import * as types from '../constants/actionTypes';

export function postsList()
{
    return new Promise((resolve, reject) =>
    {
        const url = 'https://api.isuncrowd.com/zh/posts';
        request.get(url)
            .set('Accept', 'application/json')
            .end((err, res) =>
            {
                if (err || res.status !== 200 || res.body.result !== 1)
                {
                    if (err || res.status !== 200)
                    {
                        reject(new Error(err));
                    }
                    else
                    {
                        reject(new Error(res.body.message));
                    }
                }
                else
                {
                    resolve({
                        type: types.GET_LATEST_LIST,
                        data: res.body.data
                    });
                }
            });
    });
}
