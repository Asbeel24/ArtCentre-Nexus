import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Concept, NetworkNode, NetworkLink } from '../types';

interface ConceptNetworkProps {
  concepts: Concept[];
  onNodeClick: (concept: Concept) => void;
}

const ConceptNetwork: React.FC<ConceptNetworkProps> = ({ concepts, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.max(500, containerRef.current.clientHeight),
        });
      }
    };
    window.addEventListener('resize', updateDims);
    updateDims();
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  useEffect(() => {
    if (!svgRef.current || concepts.length === 0) return;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const nodes: NetworkNode[] = concepts.map(c => ({
      id: c.id,
      group: 1,
      val: 1,
      data: c
    }));

    // Create links based on relatedIds
    const links: NetworkLink[] = [];
    concepts.forEach(source => {
      source.relatedIds.forEach(targetId => {
        // Only create link if target exists in our dataset
        if (concepts.find(c => c.id === targetId)) {
          links.push({ source: source.id, target: targetId });
        }
      });
    });

    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', [0, 0, dimensions.width, dimensions.height])
      .attr('style', 'max-width: 100%; height: auto;');

    // Simulation setup
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collide', d3.forceCollide(30));

    // Lines
    const link = svg.append('g')
      .attr('stroke', '#475569')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1);

    // Nodes (Groups of Circle + Text)
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // Category colors
    const colorScale = d3.scaleOrdinal(d3.schemeSet3);

    node.append('circle')
      .attr('r', 8)
      .attr('fill', (d: any) => colorScale(d.data.category))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('cursor', 'pointer')
      .on('click', (event, d: any) => {
        onNodeClick(d.data);
      });

    node.append('text')
      .text((d: any) => d.data.name)
      .attr('x', 12)
      .attr('y', 4)
      .attr('fill', '#e2e8f0')
      .attr('font-size', '10px')
      .attr('pointer-events', 'none')
      .style('text-shadow', '1px 1px 2px #000');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Zoom capabilities
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            svg.selectAll('g').attr('transform', event.transform);
        });

    svg.call(zoom as any);

  }, [concepts, dimensions, onNodeClick]);

  return (
    <div ref={containerRef} className="w-full h-full bg-slate-900 rounded-lg border border-slate-700 overflow-hidden relative">
      <div className="absolute top-4 left-4 pointer-events-none bg-black/50 p-2 rounded text-xs text-slate-300">
        <p>Interactive Map</p>
        <p>Scroll to zoom, Drag to move</p>
      </div>
      <svg ref={svgRef} className="w-full h-full block"></svg>
    </div>
  );
};

export default ConceptNetwork;