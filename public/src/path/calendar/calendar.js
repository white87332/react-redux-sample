import React from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import equal from 'deep-equal';
import './calendar.scss';

// has params state
function mapStateToProps()
{
    return {};
}

// has params dispatch
function mapDispatchToProps()
{
    return {};
}

class Calendar extends React.Component
{
    constructor(props, context)
    {
        super(props, context);

        this.preYear = this.preYear.bind(this);
        this.nextYear = this.nextYear.bind(this);
        this.preMonth = this.preMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.today = this.today.bind(this);

        const d = new Date();
        this.state = {
            year: d.getFullYear(),
            month: d.getMonth() + 1
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if (equal(this.state, nextState))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    // isLeapYear(year)
    // {
    //     if (0 === year % 400 || (0 === year % 4 && 0 !== year % 100))
    //     {
    //         return true;
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }
    //
    // maxDayOfDate(year, month)
    // {
    //     if (1 === month || 3 === month || 5 === month || 7 === month || 8 === month || 10 === month || 12 === month)
    //     {
    //         return 31;
    //     }
    //     else if (4 === month || 6 === month || 9 === month || 11 === month)
    //     {
    //         return 30;
    //     }
    //     else
    //     {
    //         if (this.isLeapYear(year))
    //         {
    //             return 29;
    //         }
    //         else
    //         {
    //             return 28;
    //         }
    //     }
    // }

    // getStartDate(d)
    // {
    //     d.setDate(1);
    //     return d;
    // }
    //
    // getEndDate(d)
    // {
    //     let totalDays = maxDayOfDate(parseInt(d.getFullYear()), parseInt(d.getMonth() + 1));
    //     d.setDate(totalDays);
    //     return d;
    // }

    preYear()
    {
        const { year } = this.state;
        this.setState(update(this.state, {
            year: { $set: year - 1 }
        }));
    }

    nextYear()
    {
        const { year } = this.state;
        this.setState(update(this.state, {
            year: { $set: year + 1 }
        }));
    }

    preMonth()
    {
        let { year, month } = this.state;
        month -= 1;
        if (month === 0)
        {
            year -= 1;
            month = 12;
        }
        this.setState(update(this.state, {
            year: { $set: year },
            month: { $set: month }
        }));
    }

    nextMonth()
    {
        let { year, month } = this.state;
        month += 1;
        if (month === 13)
        {
            year += 1;
            month = 1;
        }
        this.setState(update(this.state, {
            year: { $set: year },
            month: { $set: month }
        }));
    }

    today()
    {
        this.setState(update(this.state, {
            year: { $set: new Date().getFullYear() },
            month: { $set: new Date().getMonth() + 1 }
        }));
    }

    renderTr()
    {
        const { year, month } = this.state;
        const dayFormat = new Date(year, month, 0).toString().split(' ');
        const whatDay = dayFormat[0];
        const totalDays = parseInt(dayFormat[2], 10);

        for (let i = 1; i <= totalDays; i += 1)
        {
            // if (1 == i % 7 || 1 == i)
            // {
            //
            // }

            switch (whatDay)
            {
                case 'Tue':

                    break;
                case 'Wed':

                    break;
                case 'Thu':

                    break;
                case 'Fri':

                    break;
                case 'Sat':

                    break;
                case 'Sun':

                    break;
                default:
            }
        }
    }

    render()
    {
        const { year, month } = this.state;
        return (
            <div className="calendar">
                <div className="btns">
                    <div><input type="button" value="去年" onClick={() => this.preYear()} />{year}年</div>
                    <div><input type="button" value="明年" onClick={() => this.nextYear()} /></div>
                    <div><input type="button" value="上月" onClick={() => this.preMonth()} />&nbsp; {month}月&nbsp;</div>
                    <div><input type="button" value="下月" onClick={() => this.nextMonth()} /></div>
                    <div><input type="button" value="今天" onClick={() => this.today()} /></div>
                </div>

                <div className="day">
                    <div>星期一</div>
                    <div>星期二</div>
                    <div>星期三</div>
                    <div>星期四</div>
                    <div>星期五</div>
                    <div>星期六</div>
                    <div>星期日</div>
                </div>

                <div className="total">
                    {this.renderTr()}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
