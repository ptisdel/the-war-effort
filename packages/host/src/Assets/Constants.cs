using System.Collections;
using System.Collections.Generic;


public struct Point
{
    public int x;
    public int y;

    public Point(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}

public struct Region
{
    public string id;
    public string name;
    public Point point;
    public List<string> neighbors;

    public Region(string id, string name, Point point, List<string> neighbors)
    {
        this.id = id;
        this.name = name;
        this.point = point;
        this.neighbors = neighbors;
    }
}
