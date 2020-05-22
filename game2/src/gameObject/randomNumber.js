export default function Random()
{
    let random;
    do{
        random=Math.floor(Math.random()*10);
    } while (random<=3)
    return random;
}