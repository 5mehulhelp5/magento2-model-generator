import type ColumnInterface from "~/interfaces/ColumnInterface";
import { useModuleStore } from '@/stores/moduleStore'
import type { ModuleStore } from '@/stores/moduleStore'
import { useModelStore } from '@/stores/modelStore'
import type { ModelStore } from '@/stores/modelStore'
import { useAdminGridStore} from "@/stores/admingridStore";
import type { AdminGridStore} from "@/stores/admingridStore";
import { useTableStore} from "@/stores/tableStore";
import type { TableStore} from "@/stores/tableStore";

export default class StateAware {
  protected moduleStore: ModuleStore
  protected adminGridStore: AdminGridStore
  protected modelStore: ModelStore
  protected tableStore: TableStore

  constructor() {
    this.moduleStore = useModuleStore();
    this.adminGridStore = useAdminGridStore();
    this.modelStore = useModelStore();
    this.tableStore = useTableStore();
  }

  moduleName() {
    return this.moduleStore.moduleName
  }

  vendorName() {
    return this.moduleStore.vendorName
  }

  modelName(): string {
    return this.modelStore.name
  }

  baseName() {
    return (
      this.vendorName().toLowerCase() +
      '_' +
      this.moduleName().toLowerCase() +
      '_' +
      this.modelName().toLowerCase()
    )
  }

  moduleRegistration() {
    return `${this.moduleName()}_${this.vendorName()}`
  }

  listingName() {
    return `${this.baseName()}_listing`
  }

  formName() {
    return `${this.baseName()}_form`
  }

  columnsName() {
    return `${this.baseName()}_columns`
  }

  listingDataSource() {
    return `${this.listingName()}_data_source`
  }

  formDataSource() {
    return `${this.formName()}_data_source`
  }

  isNewButtonsEnabled() {
    return this.adminGridStore.newButton
  }

  routePath() {
    const moduleName = this.moduleStore.moduleName.toLowerCase()
    const vendorName = this.moduleStore.vendorName.toLowerCase()

    return `${vendorName}_${moduleName}`
  }

  routeFrontName() {
    const moduleName = this.moduleStore.moduleName.toLowerCase()
    const vendorName = this.moduleStore.vendorName.toLowerCase()

    return `${vendorName}-${moduleName}`
  }

  baseRoute() {
    const moduleName = this.moduleStore.moduleName.toLowerCase()
    const vendorName = this.moduleStore.vendorName.toLowerCase()
    const modelName = this.modelStore.name

    return `${vendorName}_${moduleName}/${modelName.toLowerCase()}/`
  }

  columns(): Array<ColumnInterface> {
    return this.tableStore.columns.filter((column: ColumnInterface) => column.fieldName !== '')
  }

  formattedColumns(): Array<ColumnInterface> {
    const columns = this.columns().map((column) => {
      return {
        fieldName: column.fieldName,
        inputType: column.inputType,
        fieldNameUppercase: column.fieldName.toUpperCase(),
        functionName: this.toPascalCase(column.fieldName),
        phpType: this.inputTypeToPhpType(column.inputType),
      }
    })

    if (!this.includeDataModels()) {
      return columns.filter((column) => column.fieldName !== 'entity_id')
    }

    return columns
  }

  inputTypeToPhpType(inputType: string): string {
    switch (inputType) {
      case 'text':
      case 'textarea':
      case 'select':
      case 'multiselect':
      case 'boolean':
      case 'date':
      case 'datetime':
      case 'time':
      case 'file':
        return 'string'
      case 'int':
        return 'int'
      case 'decimal':
        return 'float'
      default:
        return 'string'
    }
  }

  toPascalCase(input: string): string {
    input = input.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    )

    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  tableName(): string {
    return this.modelStore.tableName
  }

  indexField(): string {
    return this.columns()[0].fieldName
  }

  isAdmingrid(): boolean {
    return this.adminGridStore.enabled;
  }

  isSticky(): boolean {
    return this.adminGridStore.sticky
  }

  isPaging(): boolean {
    return this.adminGridStore.paging
  }

  isBookmarks(): boolean {
    return this.adminGridStore.bookmarks
  }

  isSearch(): boolean {
    return this.adminGridStore.search
  }

  isMassActions(): boolean {
    return this.adminGridStore.massactions
  }

  getIndexField(): string {
    return `${this.tableName()}_${this.indexField()}`.toUpperCase()
  }

  variableName(): string {
    const modelName = this.modelName()
    const firstLetter = modelName.charAt(0).toLowerCase()

    return firstLetter + modelName.slice(1)
  }

  includeModuleRegistration() {
    return this.moduleStore.includeModuleRegistration
  }

  includeDataModels() {
    return this.moduleStore.includeDataModels
  }

  addToMenu() {
    return this.adminGridStore.addToMenu
  }

  menuParent() {
    return this.adminGridStore.menuParent
  }

  virtualCollectionName() {
    return `${this.vendorName()}${this.moduleName()}${this.modelName()}Collection`
  }

  friendlyName(column: ColumnInterface) {
    return column.fieldName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  fileContext() {
    return {
      ModuleName: this.moduleName(),
      VendorName: this.vendorName(),
      ModelName: this.modelName(),
      TableName: this.tableName(),
      IndexField: this.indexField(),
      ListingName: this.listingName(),
      FormName: this.formName(),
      VariableName: this.variableName(),
      Columns: this.formattedColumns(),
      BaseRoute: this.baseRoute(),
      RoutePath: this.routePath(),
      RouteFrontName: this.routeFrontName(),
      MenuParent: this.menuParent(),
      ModelPath: this.includeDataModels() ? 'Model\\Data' : 'Model',
      IncludeAdminGrid: this.isAdmingrid(),
      DataSource: this.listingDataSource(),
      FormDataSource: this.formDataSource(),
      VirtualCollectionName: this.virtualCollectionName(),
    }
  }
}
