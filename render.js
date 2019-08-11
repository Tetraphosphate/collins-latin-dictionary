var data = JSON.parse(json);

var dagre = dagreD3.dagre;
var g = new dagreD3.graphlib.Graph();

// Set an object for the graph label
g.setGraph({
    ranksep: 50,
    nodesep: 50,
    rankdir: 'TB',
    ranker: 'longest-path'
});

// Default to assigning a new object as a label for each new edge.
g.setDefaultEdgeLabel(function() {
    return {};
});


// Add nodes
var i; //should be same as data[i].id

for (i = 0; i < data.length; i++) { //sets a whole bunch of nodes
    g.setNode("node-" + data[i].id, {
        label: data[i].name,
        class: data[i].class
    }); //create node
}

// Add edges
var mother;
var father;

for (i = 0; i < data.length; i++) { //sets a whole bunch of edges
    console.log(i);
    mother = data[i].mother;
    father = data[i].father;
    if (mother !== "") { //if mother is not blank, draw line between mother and child
        g.setEdge("node-" + mother, "node-" + data[i].id, {
            curve: d3.curveBasis
        });
    }
    if (father !== "") { //if father is not blank, draw line between father and child
        g.setEdge("node-" + father, "node-" + data[i].id, {
            curve: d3.curveBasis
        });
    }
}


// Set up an SVG group so that we can translate the final graph.
var svg = d3.select('svg'),
    inner = svg.select('g');
svgGroup = svg.append('g');

// Set up zoom support
var zoom = d3.zoom().on("zoom", function() {
    inner.attr("transform", d3.event.transform);
});
svg.call(zoom);

// Create the renderer
var render = new dagreD3.render();
// Run the renderer. This is what draws the final graph.
render(d3.select('.d3 g'), g);
var initialScale = 0.75;
svg.call(zoom.transform, d3.zoomIdentity.translate((1000 - g.graph().width * initialScale) / 2, 20).scale(initialScale));
