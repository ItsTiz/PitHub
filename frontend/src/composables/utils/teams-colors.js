export function getTeamColor(teamName, darken = false) {
  if (!teamName) return 'grey';   
  
  const cleanName = teamName.toLowerCase();

  if (cleanName.includes('ferrari')) return darken ? 'ferrari' : 'ferrari-darken-1';
  if (cleanName.includes('red bull') || cleanName.includes('rbpt') || cleanName.includes('redbull')) return darken ? 'redbull' : 'redbull-darken-1';
  if (cleanName.includes('mclaren')) return darken ? 'mclaren' : 'mclaren-darken-1';
  if (cleanName.includes('mercedes')) return darken ? 'mercedes' : 'mercedes-darken-1';
  if (cleanName.includes('aston martin') || cleanName.includes('astonmartin')) return darken ? 'astonmartin' : 'astonmartin-darken-1';
  if (cleanName.includes('alpine')) return darken ? 'alpine' : 'alpine-darken-1';
  if (cleanName.includes('williams')) return darken ? 'williams' : 'williams-darken-1';
  if (cleanName.includes('audi') || cleanName.includes('sauber')) return darken ? 'audi' : 'audi-darken-1';
  if (cleanName.includes('haas')) return darken ? 'haas' : 'haas-darken-1';
  if (cleanName.includes('cadillac') || cleanName.includes('andretti')) return darken ? 'cadillac' : 'cadillac-darken-1';
  
  if (cleanName.includes('vcarb') || cleanName.includes('visa') || cleanName.includes('racing bulls')) return darken ? 'vcarb' : 'vcarb-darken-1';

  return 'primary';
}

export function getTeamHex(theme, teamName, darken = false) {
  const colorKey = getTeamColor(teamName, darken)
  const hex = theme.current.value.colors[colorKey]

  return hex || '#ffffff'
}