import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { StatisticsService } from './StatisticsService';
import { ServiceStatusData } from './service-status-data.model';
import { TechnicianEffectivenessDTO } from '../../modules/DTO/TechnicianEffectivenessDTO'; // Asegúrate de tener este modelo definido
import { WarrantiesByTechnicianDTO } from 'src/app/modules/DTO/WarrantiesByTechnicianDTO';
import { WarrantiesByTypeDTO } from 'src/app/modules/DTO/WarrantiesByTypeDTO ';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  selectedDate: Date = new Date();
  serviceStatusOptions: EChartsOption = {};
  serviceTypeOptions: EChartsOption = {};
  technicianEffectivenessOptions: EChartsOption = {};
  warrantiesByTechnicianOptions: EChartsOption = {};
  totalWarrantiesOptions: EChartsOption = {};

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.initCharts();
  }

  onDateChange(event: Event): void {
    this.initCharts();
  }

  private initCharts(): void {
    this.statisticsService.getServiceStatusStatistics().subscribe((data: ServiceStatusData[]) => {
      const formattedData = data.map(item => ({ value: item.value, name: item.name }));
      
      this.serviceStatusOptions = {
        title: {
          text: 'Estado de los Servicios'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Estado',
            type: 'pie',
            radius: '50%',
            data: formattedData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    });

    this.statisticsService.getServiceTypesStatisticsByMonth().subscribe((data: any) => {
      const seriesData = Object.keys(data).map(serviceType => ({
        name: serviceType,
        type: 'bar',
        data: Object.keys(data[serviceType]).map(month => data[serviceType][month])
      })) as EChartsOption['series'];

      this.serviceTypeOptions = {
        title: {
          text: 'Tipos de Servicios por Mes'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: Object.keys(data)
        },
        xAxis: {
          type: 'category',
          data: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      };
    });

    this.statisticsService.getTechnicianEffectivenessStatistics().subscribe((data: TechnicianEffectivenessDTO[]) => {
      const technicians = Array.from(new Set(data.map(item => item.technicianName)));
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      const seriesData = technicians.map(tech => ({
        name: tech,
        type: 'line',
        data: months.map((_, index) => {
          const monthData = data.find(item => item.technicianName === tech && item.month === index + 1);
          return monthData ? monthData.effectiveness : 0;
        })
      })) as EChartsOption['series'];

      this.technicianEffectivenessOptions = {
        title: {
          text: 'Efectividad de Técnicos'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: technicians
        },
        xAxis: {
          type: 'category',
          data: months
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      };
    });

    this.statisticsService.getWarrantiesByTechnician().subscribe((data: WarrantiesByTechnicianDTO[]) => {
      const technicians = Array.from(new Set(data.map(item => item.technicianName)));

      const seriesData: EChartsOption['series'] = technicians.map(tech => ({
        name: tech,
        type: 'bar',
        data: new Array(12).fill(0).map((_, index) => {
          const monthData = data.find(item => item.technicianName === tech && item.month === index + 1);
          return monthData ? monthData.warrantyCount : 0;
        })
      }));

      this.warrantiesByTechnicianOptions = {
        title: {
          text: 'Garantías por Técnico por Mes'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: technicians
        },
        xAxis: {
          type: 'category',
          data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      };
    });
    this.statisticsService.getWarrantiesByType().subscribe((data: WarrantiesByTypeDTO[]) => {
      const types = Array.from(new Set(data.map(item => item.warrantyType)));

      const seriesData: EChartsOption['series'] = types.map(type => ({
        name: type,
        type: 'line',
        data: new Array(12).fill(0).map((_, index) => {
          const monthData = data.find(item => item.warrantyType === type && item.month === index + 1);
          return monthData ? monthData.warrantyCount : 0;
        })
      }));

      this.totalWarrantiesOptions = {
        title: {
          text: 'Garantías Totales por Tipo'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: types
        },
        xAxis: {
          type: 'category',
          data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      };
    });
  }
  downloadReport() {
    this.statisticsService.downloadTechnicianSettlementReport().subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'technician_settlement.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  downloadServiceReports() {
    this.statisticsService.downloadServiceReports().subscribe(blob => {
      saveAs(blob, 'service_reports.xlsx');
    }, error => {
      console.error('Error downloading the file', error);
    });
  }
}
