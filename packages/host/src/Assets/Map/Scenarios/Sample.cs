using System.Collections.Generic;

namespace Map.Scenarios
{

    // TODO: add ScriptableObject that lets me define scenarios via the Editor 
    public static class SampleData
    {
        static readonly List<Region> SampleRegions = new List<Region>()
        {
            new Region("0", "A", new Point(-1, 2), new List<string>() { "1", "2" }),
            new Region("1", "B", new Point(1, 4), new List<string>() { "0", "3" }),
            new Region("2", "C", new Point(-5, 1), new List<string>() { "0", "3" }),
            new Region("3", "D", new Point(0, 0), new List<string>() { "1", "2" }),
        };

        static readonly List<Connection> SampleConnections = new List<Connection>()
        {
            new Connection("0", "1"),
            new Connection("0", "2"),
            new Connection("1", "2"),
            new Connection("1", "3"),
        };

        public static Scenario sampleScenario = new Scenario(
            SampleRegions,
            SampleConnections
        );

    }
}

