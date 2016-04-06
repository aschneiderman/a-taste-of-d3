// orgChart.js: create a simple organization chart

function orgChart(width, height, orgData) {

	// Create the SVG area, and indent the dendrogram so the first node's title is visible
	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(80,0)");

	// Create a cluster layout function
	var cluster = d3.layout.cluster()
	    .size([height, width - 160]);

	// Use the cluster layout function to calculate the position of the nodes and lines that connect them
	var clusteredNodes = cluster.nodes(orgData),
	    clusteredLinks = cluster.links(clusteredNodes);

	// Create the lines that connect the nodes
	var link = svg.selectAll(".link")
	    .data(clusteredLinks)
	  .enter().append("path")
	    .attr("class", "link")
	    .attr("d", d3.svg.diagonal().projection(
	        function(d) { return [d.y, d.x]; }) );

	// Create the groups that will contain the nodes, each of which consist of a circle and a text title
	var nodes = svg.selectAll(".node")
	  .data(clusteredNodes)
	.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

	// Create a circle for each node
	nodes.append("circle")
	    .attr("r", 4.5);

	// Create the title for each node
	nodes.append("text")
	    .attr("dx", function(d) { return d.children ? -8 : 8; })
	    .attr("dy", 3)
	    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
	    .text(function(d) { return d.name; });

};
