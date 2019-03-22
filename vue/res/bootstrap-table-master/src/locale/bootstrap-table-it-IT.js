/**
 * Bootstrap Table Italian translation
 * Author: Davide Renzi<davide.renzi@gmail.com>
 * Author: Davide Borsatto <davide.borsatto@gmail.com>
 * Author: Alessio Felicioni <alessio.felicioni@gmail.com>
 */
($ => {
  $.fn.bootstrapTable.locales['it-IT'] = {
    formatLoadingMessage () {
      return 'Caricamento in corso'
    },
    formatRecordsPerPage (pageNumber) {
      return `${pageNumber} elementi per pagina`
    },
    formatShowingRows (pageFrom, pageTo, totalRows) {
      return `Visualizzazione da ${pageFrom} a ${pageTo} di ${totalRows} elementi`
    },
    formatDetailPagination (totalRows) {
      return `Showing ${totalRows} rows`
    },
    formatSearch () {
      return 'Cerca'
    },
    formatNoMatches () {
      return 'Nessun elemento trovato'
    },
    formatPaginationSwitch () {
      return 'Nascondi/Mostra paginazione'
    },
    formatRefresh () {
      return 'Aggiorna'
    },
    formatToggle () {
      return 'Attiva/Disattiva'
    },
    formatColumns () {
      return 'Colonne'
    },
    formatFullscreen () {
      return 'Fullscreen'
    },
    formatAllRows () {
      return 'Tutto'
    },
    formatAutoRefresh () {
      return 'Auto Refresh'
    },
    formatExport () {
      return 'Esporta dati'
    },
    formatClearFilters () {
      return 'Pulisci filtri'
    },
    formatJumpto () {
      return 'GO'
    },
    formatAdvancedSearch () {
      return 'Advanced search'
    },
    formatAdvancedCloseButton () {
      return 'Close'
    }

  }

  $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['it-IT'])
})(jQuery)
