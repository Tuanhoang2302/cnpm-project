// hàm dùng để thiết lập vị trí của các quả bóng
let distance;
const widthSce=1024 // chiều rộng và chiều cao của màn chơi
const widthH=228 // chiều rộng cà chiều cao của  các khay
export default function Location(LocationX,sohop)
{
        for (let i = 1; i<=3; i++)
        {
            LocationX[i] = 90 +30 + (2*i-1)* widthH/2 + 50*(i-1);
        }
        
    if (sohop>6)
    {
        for (let i = 4; i<=6; i++)
        {
            LocationX[i]=90 +30 + (2*(i-3)-1)* widthH/2 + 50*(i-3-1);
        }
        for (let i = 7; i<=sohop; i++)
        {
            distance= (widthSce - widthH*(sohop-6) - (sohop-1-6)*50 - 90*2)/2; 
            LocationX[i]=90 + distance + (2*(i-6)-1)* widthH/2 + 50*(i-1-6);
            
        }
    }
    else 
    {
        for (let i = 4; i<= sohop; i++)
        {
            distance= (widthSce - widthH*(sohop-3) - (sohop-1-3)*50 - 90*2)/2; 
            LocationX[i]=90 + distance + (2*(i-3)-1)* widthH/2 + 50*(i-1-3);
        }
    }
    return LocationX;
}
