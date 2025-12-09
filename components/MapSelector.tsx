'use client';

import React, { useState } from 'react';
import { Map as MapData, MapType, maps } from '@/data/maps';
import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapSelectorProps {
  selectedMap: MapData | null;
  selectedSubMap: any;
  onMapSelect: (map: MapData, subMap?: any) => void;
}

export default function MapSelector({ selectedMap, selectedSubMap, onMapSelect }: MapSelectorProps) {
  const [expandedTypes, setExpandedTypes] = useState<Set<MapType>>(new Set([MapType.CONTROL]));

  const toggleType = (type: MapType) => {
    const newExpanded = new Set(expandedTypes);
    if (newExpanded.has(type)) {
      newExpanded.delete(type);
    } else {
      newExpanded.add(type);
    }
    setExpandedTypes(newExpanded);
  };

  const getTypeColor = (type: MapType, isExpanded: boolean) => {
    if (isExpanded) {
      return 'text-orange-400';
    }
    return 'text-slate-400';
  };

  // 按类型分组地图
  const mapsByType = maps.reduce((acc, map) => {
    if (!acc[map.type]) {
      acc[map.type] = [];
    }
    acc[map.type].push(map);
    return acc;
  }, {} as Record<MapType, MapData[]>);

  return (
    <div className="w-full bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 px-1">
        <MapPin className="w-5 h-5" />
        选择地图
      </h2>
      
      <div className="space-y-2">
        {Object.entries(mapsByType).map(([type, typeMaps]) => (
          <div key={type} className="border border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleType(type as MapType)}
              className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 transition-colors flex items-center justify-between"
            >
              <span className={cn('font-semibold', getTypeColor(type as MapType, expandedTypes.has(type as MapType)))}>
                {type} ({typeMaps.length})
              </span>
              {expandedTypes.has(type as MapType) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {expandedTypes.has(type as MapType) && (
              <div className="p-2 space-y-1">
                {typeMaps.map((map) => (
                  <div key={map.id}>
                    {map.subMaps ? (
                      <div className="space-y-1">
                        <div className="font-medium text-sm text-slate-400 px-2 py-1">
                          {map.name}
                        </div>
                        {map.subMaps.map((subMap) => (
                          <button
                            key={subMap.id}
                            onClick={() => onMapSelect(map, subMap)}
                            className={cn(
                              'w-full text-left px-4 py-2 rounded hover:bg-slate-700/50 transition-colors text-sm',
                              selectedMap?.id === map.id && selectedSubMap?.id === subMap.id
                                ? 'bg-blue-500/20 border border-blue-500'
                                : ''
                            )}
                          >
                            {subMap.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        onClick={() => onMapSelect(map)}
                        className={cn(
                          'w-full text-left px-4 py-2 rounded hover:bg-slate-700/50 transition-colors',
                          selectedMap?.id === map.id && !selectedSubMap
                            ? 'bg-blue-500/20 border border-blue-500'
                            : ''
                        )}
                      >
                        {map.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
