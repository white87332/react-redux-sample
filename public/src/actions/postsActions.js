import * as types from '../constants/actionTypes';
import request from 'superagent';

export function postsList()
{
    return (dispatch) =>
    {
        let url = "https://api.isuncrowd.com/zh/posts";
        request.get(url)
            .set('Accept', 'application/json')
            .end((err, res) =>
            {
                if (err || res.status !== 200 || res.body.result !== 1)
                {
                    dispatch(
                    {
                        type: types.GET_ERR
                    });
                }
                else
                {
                    dispatch(
                    {
                        type: types.GET_LATEST_LIST,
                        data: res.body.data
                    });
                }
            });
    };
}
