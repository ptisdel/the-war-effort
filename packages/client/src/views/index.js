import loadable from 'react-loadable';
import LoadingView from './loading-view/loading-view';

const dynamicallyImport = importFunction => loadable({
  loader: importFunction,
  loading: LoadingView,
});

const AirSupportView = dynamicallyImport(() => import('./air-support-view/air-support-view'));
const AudienceView = dynamicallyImport(() => import('./audience-view/audience-view'));
const CommanderView = dynamicallyImport(() => import('./commander-view/commander-view'));
const GroundForcesView = dynamicallyImport(() => import('./ground-forces-view/ground-forces-view'));
const IntelligenceView = dynamicallyImport(() => import('./intelligence-view/intelligence-view'));
const LogisticsView = dynamicallyImport(() => import('./logistics-view/logistics-view'));
const ProcurementView = dynamicallyImport(() => import('./procurement-view/procurement-view'));
const PublicAffairsView = dynamicallyImport(() => import('./public-affairs-view/public-affairs-view'));
const TrainingView = dynamicallyImport(() => import('./training-view/training-view'));

export default {
  AirSupportView,
  AudienceView,
  CommanderView,
  GroundForcesView,
  IntelligenceView,
  LogisticsView,
  PublicAffairsView,
  ProcurementView,
  TrainingView,
};
