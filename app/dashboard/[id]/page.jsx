// app/dashboard/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatusSelector from '../components/StatusSelector';
import { getTicketById, updateTicketStatus, supabase } from '@/lib/supabase';

export default function TicketDetails({ params }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentPm, setCommentPm] = useState('');
  const router = useRouter();

  // Dictionnaire des catégories avec descriptions
  const categoryDictionary = {
    'tga-heizung': 'Heizung (z. B. Ausfall, Geräusche, Steuerung defekt)',
    'tga-klima': 'Klima- / Lüftungsanlage (z. B. keine Kühlung, Ausfall)',
    'tga-elektrik': 'Elektrik / Beleuchtung (z. B. Steckdosen, Sicherungen, Lichtausfall)',
    'tga-aufzug': 'Aufzugsanlage (z. B. außer Betrieb, Fehlermeldung)',
    'tga-sanitaer': 'Sanitär (z. B. Wasserleitung, WC, Spülung defekt, Verstopfung)',
    'tga-sprinkler': 'Sprinkler / Brandschutz (z. B. Störung, Leckage, Alarm)',
    'tga-notstrom': 'Notstromversorgung / USV',
    'tga-sonstiges': 'Sonstiges TGA',
    'allgemein-eingang': 'Eingangsbereich / Foyer',
    'allgemein-treppenhaus': 'Treppenhaus / Flure',
    'allgemein-sanitaer': 'Gemeinschafts-Sanitärbereiche',
    'allgemein-muell': 'Müllentsorgung / Müllplatz',
    'allgemein-tiefgarage': 'Tiefgarage / Stellplätze',
    'allgemein-aussenbeleuchtung': 'Außenbeleuchtung',
    'allgemein-aussenanlagen': 'Außenanlagen (z. B. Pflasterung, Einfahrten)',
    'allgemein-beschilderung': 'Beschilderung / Wegführung',
    'allgemein-reinigung': 'Reinigung / Hygiene / Grünpflege',
    'allgemein-fassade': 'Fassade',
    'allgemein-dach': 'Dach',
    'allgemein-sonstiges': 'Sonstiges Allgemeinbereich',
    'miet-waende': 'Wände / Decken (z. B. Risse, Feuchtigkeit, Putzschäden)',
    'miet-boeden': 'Böden / Beläge (z. B. beschädigt, lose, abgenutzt)',
    'miet-fenster': 'Fenster / Türen (z. B. Undichtigkeiten, Schließmechanismus)',
    'miet-sonnenschutz': 'Sonnenschutz / Jalousien',
    'miet-it': 'IT-Infrastruktur / Netzwerkverkabelung',
    'miet-innenbeleuchtung': 'Innenbeleuchtung',
    'miet-raumausstattung': 'Raumausstattung / Mobiliar (falls vom Vermieter gestellt)',
    'miet-kueche': 'Kücheneinrichtungen / Teeküche',
    'miet-sonstiges': 'Sonstiges Mietbereich',
    'sicherheit-einbruch': 'Einbruchschutz (z. B. Schlösser, Türsysteme defekt)',
    'sicherheit-video': 'Videoüberwachung',
    'sicherheit-brandmelde': 'Brandmeldeanlage / Rauchmelder',
    'sicherheit-evakuierung': 'Evakuierungswege / Notausgänge',
    'sicherheit-fluchtweg': 'Fluchtwegkennzeichnung / Notbeleuchtung',
    'sicherheit-hinweise': 'Sicherheitsrelevante Hinweise der Behörden',
    'sicherheit-sonstiges': 'Sonstiges Sicherheitsthema'
  };

  useEffect(() => {
    async function fetchTicket() {
      try {
        const data = await getTicketById(params.id);
        console.log('Ticket data:', data);
        setTicket(data);
        setCommentPm(data.comment_pm || '');
      } catch (error) {
        console.error('Error fetching ticket:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [params.id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTicketStatus(params.id, newStatus);
      setTicket({ ...ticket, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveCommentPm = async () => {
    try {
      const { data, error } = await supabase
        .from('mangelmanagement')
        .update({ comment_pm: commentPm, updated_at: new Date() })
        .eq('id', params.id)
        .select();
      if (error) throw new Error(error.message);
      setTicket({ ...ticket, comment_pm: commentPm });
      alert('Commentaire sauvegardé');
    } catch (error) {
      console.error('Error saving comment_pm:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket non trouvé</p>;

  // Formater les catégories avec le dictionnaire
  const formatCategories = (categories) => {
    console.log('Formatting categories:', categories);
    if (Array.isArray(categories) && categories.length > 0) {
      return categories.map(cat => categoryDictionary[cat] || cat).join(', ');
    }
    if (typeof categories === 'string' && categories.trim() !== '' && categories !== '[]') {
      try {
        const parsed = JSON.parse(categories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(cat => categoryDictionary[cat] || cat).join(', ');
        }
        return categoryDictionary[categories] || categories;
      } catch {
        return categoryDictionary[categories] || categories;
      }
    }
    return null; // Ne rien afficher pour [], null, ou ''
  };

  return (
    <div>
      <h1>Ticket: {ticket.titel}</h1>
      {ticket.mieter && <p><strong>Mieter:</strong> {ticket.mieter}</p>}
      {ticket.ansprechpartner && <p><strong>Ansprechpartner:</strong> {ticket.ansprechpartner}</p>}
      {ticket.email && <p><strong>Email:</strong> {ticket.email}</p>}
      {ticket.telefonnummer && <p><strong>Telefonnummer:</strong> {ticket.telefonnummer}</p>}
      {ticket.adresse && <p><strong>Adresse:</strong> {ticket.adresse}</p>}
      {ticket.mieteinheit && <p><strong>Mieteinheit:</strong> {ticket.mieteinheit}</p>}
      {ticket.vertragsnummer && <p><strong>Vertragsnummer:</strong> {ticket.vertragsnummer}</p>}
      {ticket.beschreibung && <p><strong>Beschreibung:</strong> {ticket.beschreibung}</p>}
      {ticket.gebaeudeteil && <p><strong>Gebäudeteil:</strong> {ticket.gebaeudeteil}</p>}
      {ticket.etage && <p><strong>Etage:</strong> {ticket.etage}</p>}
      {ticket.raumbezeichnung && <p><strong>Raumbezeichnung:</strong> {ticket.raumbezeichnung}</p>}
      {ticket.zusatzlage && <p><strong>Zusätzliche Lagebeschreibung:</strong> {ticket.zusatzlage}</p>}
      {formatCategories(ticket.tga_categories) && (
        <p><strong>TGA Categories:</strong> {formatCategories(ticket.tga_categories)}</p>
      )}
      {formatCategories(ticket.allgemein_categories) && (
        <p><strong>Allgemein Categories:</strong> {formatCategories(ticket.allgemein_categories)}</p>
      )}
      {formatCategories(ticket.miet_categories) && (
        <p><strong>Miet Categories:</strong> {formatCategories(ticket.miet_categories)}</p>
      )}
      {formatCategories(ticket.sicherheit_categories) && (
        <p><strong>Sicherheit Categories:</strong> {formatCategories(ticket.sicherheit_categories)}</p>
      )}
      {ticket.sonstiges_tga && <p><strong>Sonstiges TGA:</strong> {ticket.sonstiges_tga}</p>}
      {ticket.sonstiges_allgemein && <p><strong>Sonstiges Allgemein:</strong> {ticket.sonstiges_allgemein}</p>}
      {ticket.sonstiges_miet && <p><strong>Sonstiges Miet:</strong> {ticket.sonstiges_miet}</p>}
      {ticket.sonstiges_sicherheit && <p><strong>Sonstiges Sicherheit:</strong> {ticket.sonstiges_sicherheit}</p>}
      {ticket.dringlichkeit && <p><strong>Priorität:</strong> {ticket.dringlichkeit}</p>}
      {ticket.zugang_erforderlich !== null && <p><strong>Zugang erforderlich:</strong> {ticket.zugang_erforderlich ? 'Ja' : 'Nein'}</p>}
      {ticket.timefenster && <p><strong>Timefenster:</strong> {ticket.timefenster}</p>}
      {ticket.zutrittsregelungen && <p><strong>Zutrittsregelungen:</strong> {ticket.zutrittsregelungen}</p>}
      {ticket.datenschutz !== null && <p><strong>Datenschutz:</strong> {ticket.datenschutz ? 'Ja' : 'Nein'}</p>}
      {ticket.created_at && <p><strong>Créé le:</strong> {new Date(ticket.created_at).toLocaleString()}</p>}
      {ticket.updated_at && <p><strong>Mis à jour le:</strong> {new Date(ticket.updated_at).toLocaleString()}</p>}
      {ticket.estimated_price_ki && <p><strong>Prix estimé (KI):</strong> {`${ticket.estimated_price_ki} €`}</p>}
      {ticket.comment_ki && <p><strong>Commentaire (KI):</strong> {ticket.comment_ki}</p>}
      {ticket.comment_pm && <p><strong>Commentaire PM:</strong> {ticket.comment_pm}</p>}
      <p><strong>Status:</strong> {ticket.status}</p>
      <StatusSelector status={ticket.status} onChange={handleStatusChange} />
      <h3>Commentaire PM:</h3>
      <textarea
        value={commentPm}
        onChange={(e) => setCommentPm(e.target.value)}
        placeholder="Ajoutez un commentaire PM..."
        style={{ width: '100%', minHeight: '100px', marginBottom: '1rem' }}
      />
      <button onClick={handleSaveCommentPm} style={{ marginBottom: '1rem' }}>
        Sauvegarder commentaire PM
      </button>
      <h3>Fichiers:</h3>
      {ticket.files?.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {ticket.files.map((file, index) => (
            <div key={index}>
              <img
                src={file}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                onError={() => console.error(`Failed to load image: ${file}`)}
              />
              <p><a href={file} target="_blank" rel="noopener noreferrer">Ouvrir fichier {index + 1}</a></p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun fichier</p>
      )}
      <button onClick={() => router.push('/dashboard')} style={{ marginTop: '1rem' }}>
        Retour
      </button>
    </div>
  );
}