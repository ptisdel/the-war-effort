using System.Collections.Generic;

namespace Map
{
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

    public struct Scenario
    {
        public readonly List<Region> regions;
        public readonly List<Connection> connections;

        public Scenario(
            List<Region> regions,
            List<Connection> connections
        )
        {
            this.regions = regions;
            this.connections = connections;
        }
    }

    public struct Connection
    {
        public string regionAId;
        public string regionBId;

        public Connection(string regionAId, string regionBId)
        {
            this.regionAId = regionAId;
            this.regionBId = regionBId;
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

}