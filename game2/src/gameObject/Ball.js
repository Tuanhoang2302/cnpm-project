export default function setUpBall(numberScene, ball)
{
    for (let i = numberScene; i<= 6; i++)
    {
        ball[i].x= 280+26*(6-i);
    }
    for (let i = 1; i< numberScene; i++)
    {
        ball[i].x += 355;
    }
}